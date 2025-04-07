import jsep from './jsep';
import regexPlugin from '@jsep-plugin/regex'
import templatePlugin from '@jsep-plugin/template'
import objectPlugin from '@jsep-plugin/object'
import arrowPlugin from '@jsep-plugin/arrow'
import spreadPlugin from '@jsep-plugin/spread'
import * as p from 'esprima/src/nodes.ts'
import * as esp from 'esprima'

interface Expression {
  type: string;
  [key: string]: any;
}

// @ts-ignore-next-line
jsep.plugins.register(regexPlugin, templatePlugin, arrowPlugin, objectPlugin, spreadPlugin)



function mapUnaryOperator(jsOperator) {
  const unaryOperatorMap = {
    '!': 'NOT',    // Logical negation
    '-': '-',      // Numeric negation
    '+': '+',      // Unary plus (no change needed)
    '~': '~',      // Bitwise NOT (DuckDB supports this)
    'typeof': 'TYPEOF', // Hypothetical; DuckDB doesn’t have a direct equivalent
    'void': null,  // No direct DuckDB equivalent; could throw an error
    'delete': null // No direct DuckDB equivalent; typically for objects in JS
  };

  if (!(jsOperator in unaryOperatorMap)) {
    throw new Error(`Unsupported unary operator: ${jsOperator}`);
  }

  const mappedOperator = unaryOperatorMap[jsOperator];
  if (mappedOperator === null) {
    throw new Error(`Unary operator "${jsOperator}" is not supported in DuckDB`);
  }

  return mappedOperator;
}

// Map JavaScript operators to DuckDB operators
function mapOperator(jsOperator) {
  const operatorMap = {
    '===': '=',    // Strict equality in JS becomes equality in DuckDB
    '!==': '!=',   // Strict inequality
    '+': '+',      // Arithmetic operators remain the same
    '-': '-',
    '*': '*',
    '/': '/',
    '&&': 'AND',   // Logical AND
    '||': 'OR',    // Logical OR
    '>': '>',
    '<': '<',
    '>=': '>=',
    '<=': '<=',
  };
  if (!operatorMap[jsOperator]) {
    throw new Error(`Unsupported operator: ${jsOperator}`);
  }
  return operatorMap[jsOperator];
}

function findUndefinedVariables(ast: Expression, context: Record<string, any>): string[] {
  const undefinedVars: Set<string> = new Set();
  const contextKeys = new Set(Object.keys(context));

  function walk(node: any) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'MemberExpression' && node.object.type === 'Identifier') {
      if (!contextKeys.has(node.object.name)) {
        undefinedVars.add(node.object.name);
      }
    }
    // Check for Identifier nodes not in context
    if (node.type === 'Identifier' && !contextKeys.has(node.name)) {
      undefinedVars.add(node.name);
    }

    // Recursively walk through all object properties
    for (const key in node) {
      if (key !== 'type' && typeof node[key] === 'object') {
        walk(node[key]);
      }
    }
  }

  walk(ast);
  return Array.from(undefinedVars);
}

export function transformDuckdb(node, params = new Map<string, number>(), context = {}) {
  const contextStr = Object.entries(context).map(([key, value]) => `const ${key} = ${JSON.stringify(value)}`).join(';\n') + '\n'

  function transformNode(node) {
    // console.log(node.type, node.name, node.value)
    switch (node.type) {
      case 'ObjectExpression':
        return `{${node.properties.map(transformNode).join(', ')}}`;
      case 'Property':
        return `${transformNode(node.key)}: ${transformNode(node.value)}`;
      // case 'ArrowFunctionExpression':
      //   return `(${(node.params || []).map(transformNode).join(', ')}) => ${transformNode(node.body)}`;
      case 'SequenceExpression':
        return node.expressions.map(transformNode).join(', ');
      case 'Identifier':
        if (!node.isProperty) {
          // console.log('IDENTIFIER', node.name, params, params.has(node.name))
          if (params.has(node.name)) {
            if (params.get(node.name) === 1)
              return null
            return node.name
          }
          else if (typeof context[node.name] !== 'undefined') {
            return '(' + JSON.stringify(context[node.name]) + ')'
            // console.log('CONTEXTRTT', node.name)

          } else {
            throw new Error(`Undefined variable: ${node.name}, use .context({ ${node.name} }) too pass it down`);

          }
        }
        return node.name;
      case 'MemberExpression':
        // const isTopLevel = node.object.type === 'Identifier'
        node.property.isProperty = true
        return [transformNode(node.object), transformNode(node.property)].filter(Boolean).join('.');
      case 'Literal':
        // console.log(node.value instanceof RegExp)
        if (node.value instanceof RegExp) {
          const rgx = node.value.toString().split('/').slice(1, -1).join('/')
          const flags = node.value.flags ? `, '${node.value.flags}'` : ''
          return `'${rgx}'` + flags
        }
        if (node.raw.startsWith('"') && node.raw.endsWith('"')) {
          return `'${node.raw.slice(1, -1).replace(/'/g, "\'")}'`
        }
        return node.raw;
      case 'CallExpression':
        return `${transformNode(node.callee)}(${node.arguments.map(transformNode).join(', ')})`;

        try {
          const evalStr = `${transformNode(node.callee)}(${node.arguments.map(transformNode).join(', ')})`
          const result = eval(contextStr + evalStr);
          return String(result);
        } catch {
          // Fallback to original if evaluation fails
          return `${transformNode(node.callee)}(${node.arguments.map(transformNode).join(', ')})`;
        }
      case 'UnaryExpression':
        return `${mapUnaryOperator(node.operator)} ${transformNode(node.argument)}`;
      case 'BinaryExpression':
        const b = `${transformNode(node.left)} ${mapOperator(node.operator)} ${transformNode(node.right)}`
        return node.parenthesis ? `(${b})` : b
      case 'ArrayExpression':
        return `[${node.elements.map(transformNode).join(', ')}]`;
      case 'SpreadElement':
        // console.log({ node })
        return `...${transformNode(node.argument)}`;
      default:
        // console.log(node)
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
  return transformNode(node);
}
const extractParams = (ast: Expression) => {
  // const params: string[] = [];
  const params = new Map<string, number>();

  function walk(node: any, level = 0) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'Identifier') {
      // console.log('addddd', level, node)
      params.set(node.name, level);
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(e => walk(e, level + 1));
      return;
    }

    for (const key in node) {
      if (key !== 'type' && typeof node[key] === 'object' && key !== 'key') {
        walk(node[key], level + 1);
      }
    }
  }

  walk(ast, 0);
  return params;
}

export const extractParamsContext = (ast: Expression) => {
  console.log(ast)
  if (ast.type !== 'ArrowFunctionExpression') {
    throw new Error('AST is not an ArrowFunctionExpression');
  }
  return extractParams(ast.params)
}


export const parse = (expr: Function, context = {}) => {
  const ast = jsep(expr.toString())
  // console.log(ast)
  const params = extractParamsContext(ast)
  // const context = findUndefinedVariables(ast, {})
  const duckdbExpr = transformDuckdb(ast.body, params, context)
  return duckdbExpr
}


// // const lol = () => toto === /qds/

// // console.log({ ArrowFunctionExpression })
// // const ast = jsep(`Date.now() > 42 && (D.abs(p.age) === p.total && p.hh.regexp_matches(/123/, '')) && D.cos(99) === 12 && D.regexp_matches(p.name, /abel/, '')`)
// // const ast = jsep(`a + b + (d / c) && (12 === 12 || toto === 12)`)
// // const fn = ({ xx: { zz } }) => ((12 + zz) / 4 && &&  zz === 'string')
// // const fn = (p, { Varchar, ...rest }) => p && tata() && rest.xx.Varchar(p.name) === 'lol' && Date.now() > 0 && JSON.stringify(lola) && toto[0].lol.tata
// const fn = () => Date.now() > 42 && JSON.stringify(lola) === 'toto'
// console.log(fn.toString())
// const ast = jsep(fn.toString())
// const params = extractParamsContext(ast)
// // console.log({ params })
// // console.log(global.Math)
// console.log(JSON.stringify(ast.body, null, 2))
// // console.log(JSON.stringify(ast, null, 2))
// // console.info('>>>', {ast})

// console.log(transformDuckdb(ast.body, params, { customVar: 42, lola: 'nano' }))
// // const zz = ast ~= 'toto'
// // const fn = (v, D) => D.Varchar(v) + 12
// // console.log(fn.toString())
