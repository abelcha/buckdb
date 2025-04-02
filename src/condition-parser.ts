import ts from 'typescript';

type AllowedOperators = '&&' | '||' | '+' | '-' | '*' | '/' | '%' | '^' | '>' | '<' | '>=' | '<=' | '===' | '!==';

export class ConditionParser {
  private allowedBinaryOperators = new Set<ts.SyntaxKind>([
    ts.SyntaxKind.AmpersandAmpersandToken,
    ts.SyntaxKind.BarBarToken,
    ts.SyntaxKind.PlusToken,
    ts.SyntaxKind.MinusToken,
    ts.SyntaxKind.AsteriskToken,
    ts.SyntaxKind.SlashToken,
    ts.SyntaxKind.PercentToken,
    ts.SyntaxKind.CaretToken,
    ts.SyntaxKind.GreaterThanToken,
    ts.SyntaxKind.LessThanToken,
    ts.SyntaxKind.GreaterThanEqualsToken,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.SyntaxKind.EqualsEqualsEqualsToken,
    ts.SyntaxKind.ExclamationEqualsEqualsToken
  ]);
  allowedVars = []
  parseWhereClause(fn: Function): string {
    const fnStr = fn.toString();
    const arrowIndex = fnStr.indexOf('=>');
    if (arrowIndex === -1) {
      throw new Error('Expected an arrow function');
    }

    // Extract parameter list and validate
    const paramStart = fnStr.indexOf('(');
    const paramEnd = fnStr.indexOf(')');
    const paramsStr = fnStr.slice(paramStart + 1, paramEnd);
    const params = paramsStr.split(',').map(p => p.trim());
    this.allowedVars = params
    // if (params.length !== 2) {
    //   // throw new Error('Expected exactly 2 parameters (e, D)');
    // }
    // if (params[0] !== 'e') {
    //   this.firstParameter = params[0]
    //   // throw new Error('First parameter must be named "e"');
    // }
    // if (params[1] !== 'D') {
    //   this.secondParameter = params[1]
    //   // throw new Error('Second parameter must be named "D"');
    // }

    // Extract body expression
    let bodyStr = fnStr.slice(arrowIndex + 2).trim();
    if (bodyStr.endsWith(';')) {
      bodyStr = bodyStr.slice(0, -1);
    }

    const sourceFile = ts.createSourceFile(
      'temp.ts',
      bodyStr,
      ts.ScriptTarget.Latest,
      true
    );

    const statement = sourceFile.statements[0];
    if (!statement) {
      throw new Error('Expected an expression');
    }

    if (!ts.isExpressionStatement(statement)) {
      throw new Error('Expected an expression statement');
    }

    const expr = statement.expression;
    if (!ts.isBinaryExpression(expr) && !ts.isParenthesizedExpression(expr) && !ts.isCallExpression(expr)) {
      throw new Error('Expected a binary expression or parenthesized expression');
    }

    const sql = this.visitNode(expr);
    return sql;
  }


  private visitNode(node: ts.Node): string {
    if (ts.isBinaryExpression(node)) {
      if (!this.allowedBinaryOperators.has(node.operatorToken.kind)) {
        throw new Error(`Operator ${node.operatorToken.getText()} is not allowed`);
      }

      // Check for local variable references in left/right nodes
      if (ts.isIdentifier(node.left) && node.left.text !== 'e' && node.left.text !== 'D') {
        throw new Error('Local variable references are not allowed');
      }
      if (ts.isIdentifier(node.right) && node.right.text !== 'e' && node.right.text !== 'D') {
        throw new Error('Local variable references are not allowed');
      }

      const left = this.visitNode(node.left);
      const right = this.visitNode(node.right);
      const operator = this.getSqlOperator(node.operatorToken);

      // Only add parentheses for nested logical expressions when needed for precedence
      // Only add parentheses when:
      // 1. The expression was originally parenthesized in source, OR
      // 2. We have mixed AND/OR operators with different precedence
      const needsParens =
        (ts.isParenthesizedExpression(node.parent) && node.parent.expression === node) ||
        (operator === 'AND' && ts.isBinaryExpression(node.left) && this.getSqlOperator(node.left.operatorToken) === 'OR') ||
        (operator === 'AND' && ts.isBinaryExpression(node.right) && this.getSqlOperator(node.right.operatorToken) === 'OR');

      if (needsParens) {
        return `(${left} ${operator} ${right})`;
      }
      return `${left} ${operator} ${right}`;
    }
    else if (ts.isParenthesizedExpression(node)) {
      // Always remove outer parentheses - we'll handle precedence in binary expressions
      return this.visitNode(node.expression);
    }
    else if (ts.isPropertyAccessExpression(node)) {
      const [objectText] = node.expression.getText().split(/[\.\[]/)
      if (!this.allowedVars.includes(objectText)) {
        throw new Error(`unknown variable '${objectText}' Only local variables {${this.allowedVars.join(',')}} are allowed`);
      }

      // For properties/methods on 'e', strip 'e.' prefix but preserve nested chains
      if (this.allowedVars.includes(objectText)) {
        if (ts.isPropertyAccessExpression(node.expression)) {
          // Nested property (e.name.whatever) - visit the expression to get full chain
          const propertyChain = this.visitNode(node.expression);
          return `${propertyChain}.${node.name.text}`;
        }
        // Simple property (e.age) - strip the 'e.' prefix
        return node.name.text;
      }

      // For DuckDB functions (D.*), strip the 'D.' prefix
      if (objectText === 'D') {
        return node.name.text;
      }
      return `${objectText}.${node.name.text}`;
    }
    else if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (!ts.isPropertyAccessExpression(expression)) {
        throw new Error('Only method calls on e/D are allowed');
      }

      const objectText = expression.getText();
      let methodName = [expression.expression.getText(), expression.name.getText()].join('.').replace(/^[eD]\./, '')

      // For method calls on 'e', strip 'e.' prefix but preserve nested chains
      if (objectText === 'e') {
        if (ts.isPropertyAccessExpression(expression.expression)) {
          // Nested method call (e.name.whatever()) - visit the expression to get full chain
          const propertyChain = this.visitNode(expression.expression);
          methodName = `${propertyChain}.${methodName}`;
        } else {
          // Simple method call (e.method()) - strip the 'e.' prefix
          methodName = methodName;
        }
      }

      const args = node.arguments.map(arg => {
        const argText = this.visitNode(arg);
        // Special handling for regex patterns
        if (methodName.endsWith('.match_regex') && ts.isRegularExpressionLiteral(arg)) {
          return `'${argText.slice(1, -1)}'`;
        }
        return '' + argText + '';
      }).join(', ');

      // Handle DuckDB functions (D.*)
      if (objectText === 'D') {
        return `__${methodName}(${args})`;
      }
      return `${methodName}(${args})`;
    }
    else if (ts.isIdentifier(node)) {
      // Only allow 'e' and 'D' as identifiers
      if (node.text !== 'e' && node.text !== 'D') {
        throw new Error(`Local variable references are not allowed`);
      }
      return node.text;
    }
    else if (ts.isStringLiteral(node)) {
      // Standardize string literals to use single quotes
      const text = node.getText();
      if (text.startsWith('"')) {
        return `'${text.slice(1, -1).replace(/'/g, "''")}'`;
      }
      return text;
    }
    else if (ts.isNumericLiteral(node)) {
      return node.getText();
    }
    else if (ts.isRegularExpressionLiteral(node)) {
      // Quote regex patterns for SQL
      return `'${node.getText().slice(1, -1)}'`;
    }
    else if (ts.isTemplateExpression(node)) {
      // error 
    }
    // else if (ts.isPrefixUnaryExpression(node)) {
    //   // Handle prefix unary operators (e.g., -x)
    //   const operator = node.operator;
    //   const operand = this.visitNode(node.operand);
    //   return `${operator}${operand}`;
    // }

    throw new Error(`Unsupported node type: ${ts.SyntaxKind[node.kind]}`);
  }

  private getSqlOperator(token: ts.Token<ts.BinaryOperator>): string {
    switch (token.kind) {
      case ts.SyntaxKind.AmpersandAmpersandToken: return 'AND';
      case ts.SyntaxKind.BarBarToken: return 'OR';
      case ts.SyntaxKind.EqualsEqualsEqualsToken: return '=';
      case ts.SyntaxKind.ExclamationEqualsEqualsToken: return '!=';
      default: return token.getText();
    }
  }
}
