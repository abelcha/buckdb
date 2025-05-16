import jsep, { ArrowFunctionExpression, Expression, Property } from './jsep';
import { wrap, Ω } from './utils'
import { LitteralTypesMap, PatternMatchers } from './typedef'
import { DGlobalField } from '../.buck/types';
import { omit } from 'es-toolkit';

const RegexpFuncsWthOptions = new Map([
  ['regexp_extract', 3],
  ['regexp_extract_all', 3],
  ['regexp_replace', 3],
  ['regexp_matches', 2],
  ['regexp_full_matches', 2],
])

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
function mapOperator(jsOperator: any) {
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
    'in': 'IN'
  };
  if (!operatorMap[jsOperator]) {
    throw new Error(`Unsupported operator: ${jsOperator}`);
  }
  return operatorMap[jsOperator];
}


const joinMembers = (members: any[]) => {
  // return members.join('.')
  return members.reduce((acc, member) => {
    // console.log('MEMVER', Array.isArray(member),  member)
    if (!acc) {
      return member
    }

    if (typeof member === 'number') {
      return acc + '[' + member.toString().replace('.', ':') + ']'
    }
    // Handle Number objects with a raw property
    if (member instanceof Number && 'raw' in member) {
      return acc + '[' + (member as any).raw.replace('.', ':') + ']'
    }
    return acc + '.' + member
  }, '')
}

const SLASH = String.fromCharCode(47)
const BACKSLASH = String.fromCharCode(92)
// Helper function to check if a node is or contains a string literal
function hasStringLiteral(node) {
  if (!node) return false;

  // Direct string literal
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return true;
  }

  // Check for nested string literals in binary expressions
  if (node.type === 'BinaryExpression') {
    return hasStringLiteral(node.left) || hasStringLiteral(node.right);
  }

  return false;
}

// Helper function to recursively transform string concatenation
function transformStringConcat(node: any, transformer: any): any {
  // If not a binary expression or not addition, process normally
  if (node.type !== 'BinaryExpression' || node.operator !== '+') {
    return transformer(node);
  }

  // Recursively process left and right sides
  const left = transformStringConcat(node.left, transformer);
  const right = transformStringConcat(node.right, transformer);

  // Always use || for concatenation in binary expressions that contain strings
  return `${left} || ${right}`;
}

// Process template literal parts into SQL concatenation
function processTemplateLiteral(node, transformer) {
  if (node.expressions.length === 0) {
    // Simple template literal without expressions
    return `'${node.quasis[0].value.cooked.replaceAll(/'/g, "''")}'`;
  }

  // Template literal with expressions - use SQL string concatenation with ||
  const parts = [];

  // Process each part of the template literal
  for (let i = 0; i < node.quasis.length; i++) {
    const quasi = node.quasis[i];
    // Only add non-empty string parts
    if (quasi.value.cooked !== '') {
      parts.push(`'${quasi.value.cooked.replaceAll(/'/g, "''")}'`);
    }

    // Add expression if not at the end
    if (!quasi.tail) {
      const expr = transformer(node.expressions[i]);

      // If the expression contains binary operators, ensure it's properly parenthesized
      if (node.expressions[i].type === 'BinaryExpression' && !expr.startsWith('(')) {
        parts.push('(' + expr + ')');
      } else {
        parts.push(expr);
      }
    }
  }

  // Join all parts with the SQL concatenation operator
  return parts.join(' || ');
}

type Topts = {
  isFuncArg?: boolean
  closureVars?: string[]
}
export function transformDuckdb(node, params = new Map<string, { depth: number, position: number }>(), context: Record<string, any> = {}) {
  function transformTree(node, opts: Topts = { isFuncArg: false }) {


    const transformNode = (n, o = {}) => transformTree(n, Object.assign(opts, o))
    switch (node.type) {
      case 'ObjectExpression':
        return `{${node.properties.map(transformNode).join(', ')}}`;
      case 'Property':
        return `${transformNode({ ...node.key, isProperty: true })}: ${transformNode(node.value)}`;
      case 'SequenceExpression':
        return node.expressions.map(transformNode).join(', ');
      case 'Identifier':
        if (!node.isProperty) {
          if (params.has(node.name)) {
            if (params.get(node.name)?.depth === 0)
              return null
            return node.name
          }
          else if (opts.closureVars?.includes(node.name)) {
            return node.name
          }
          else if (typeof globalThis[node.name] !== 'undefined') {
            return `${node.name}`
          }
          else if (typeof context[node.name] !== 'undefined') {
            return '(' + JSON.stringify(context[node.name]).replaceAll(/'/g, "''").replaceAll(/\"/g, "'") + ')'
          } else {
            throw new Error(`Undefined variable: ${node.name}, use .context({ ${node.name} }) too pass it down`);
          }
        }
        return node.name;
      case 'MemberExpression':
        const hasSubMember = node.object?.type === 'MemberExpression'
        if (hasSubMember && !node.subMemberExpression && node.property.name === 'length') {
          node.property.name = 'len()' // tmp
        }
        if (hasSubMember) {
          node.object.subMemberExpression = true
        }
        node.property.isProperty = true
        const rtn = [transformNode(node.object), transformNode(node.property)].filter(Boolean).flatMap(x => x)
        return opts.isFuncArg ? rtn : joinMembers(rtn);
      case 'Literal':
        if (node.value instanceof RegExp) {
          const rgx = node.value.toString().split(SLASH).slice(1, -1).join(SLASH)
          const flags = false && opts.isFuncArg && node.value.flags ? `, '${node.value.flags}'` : ''
          return `'${rgx}'` + flags
        }
        if (node.value === null) {
          return 'NULL'
        }
        if (node.raw.startsWith('"') && node.raw.endsWith('"')) {
          return `'${node.raw.slice(1, -1).replaceAll(/'/g, "''")}'`
        }
        if (typeof node.value === 'number') {
          const rtn = new Number(node.value)
          return Object.assign(rtn, { raw: node.raw })
        }
        return node.raw;
      case 'CallExpression':
        const calleeArr = transformNode(node.callee, { isFuncArg: true })
        const lastCallee = calleeArr[calleeArr.length - 1]
        let args = node.arguments.map(e => transformNode(e, { isFuncArg: true }))
        if (RegexpFuncsWthOptions.has(lastCallee)) {
          const offset = RegexpFuncsWthOptions.get(lastCallee) as number;
          const index = node.arguments.findIndex(e => e.type === 'Literal' && e.value instanceof RegExp)
          if (index === -1) {
            break
          }
          const pargs = node.arguments.slice(index)
          if (offset === 3 && pargs.length === 1) {
            args.push('0')
          }
          if (pargs.length < offset) {
            args.push(wrap(pargs[0].value.flags, "'"))
          }
        }
        if (PatternMatchers[lastCallee]) {
          const { keyword, joinWith } = PatternMatchers[lastCallee]
          if (node.callee.object.type === 'Identifier' && params.has(node.callee.object.name)) {
            return `${args[0]} ${keyword} ${args.slice(1).join(joinWith)}`
          }
          if (lastCallee in Ω('SimilarTo', 'regexp_matches') && node.arguments?.[0]?.value?.flags) {
            return `regexp_matches(${calleeArr.slice(0, -1)}, ${args[0]}, '${node.arguments?.[0]?.value?.flags}')`
          }
          return `${calleeArr.slice(0, -1)} ${keyword} ${args.join(joinWith)}`
        }
        if (lastCallee === 'as') {
          const gargs = node.arguments.slice(1).map(transformNode)
          return `${calleeArr.slice(0, -1)}::${node.arguments[0].value}` + (gargs?.length ? ('(' + gargs.join(', ') + ')') : '')
        }

        if (typeof calleeArr[0] === 'string' && calleeArr[0].toLowerCase() === 'cast' && node.arguments.length >= 2) {
          const supp = args.length > 2 ? `(${node.arguments.map((e: any) => e.value).slice(2).join(', ')})` : ''
          return `CAST(${args[0]} AS ${node.arguments[1].value}${supp})`
        }
        if (LitteralTypesMap.has(lastCallee) && params.get(node.callee.object.name)?.position === 1) {
          const toType = LitteralTypesMap.get(lastCallee)
          if (toType === '') {
            return `(${args[0]})`
          }
          return `CAST(${args[0]} AS ${toType})`
        }
        return `${calleeArr.join('.')}(${args.join(', ')})`;
      case 'UnaryExpression':
        // fn.toString() transform true and false to !1 and !0
        if (node.operator === '!' && node.argument.type === 'Literal' && typeof node.argument.value === 'number') {
          return !node.argument.value
        }
        if (node.operator === '!' && node.argument?.callee?.property?.name === 'IsNull') {
          return transformNode(node.argument).replace('IS NULL ', 'IS NOT NULL')
        }
        return `${mapUnaryOperator(node.operator)} ${transformNode(node.argument)}`;
      case 'BinaryExpression':
        if (node.operator === 'in' && node.right.type === 'ArrayExpression') {
          return `${transformNode(node.left)} IN (${node.right.elements.map(transformNode).join(', ')})`;
        }
        // Special handling for string concatenation
        if (node.operator === '+' && hasStringLiteral(node)) {
          return transformStringConcat(node, transformNode);
        }

        // Regular binary operation
        const b = `${transformNode(node.left)} ${mapOperator(node.operator)} ${transformNode(node.right)}`;
        return node.parenthesis ? `(${b})` : b;
      case 'ArrayExpression':
        return `[${node.elements.map(transformNode).join(', ')}]`;
      case 'SpreadElement':
        return `...${transformNode(node.argument)}`;
      case 'ConditionalExpression':
        return `(CASE WHEN (${transformNode(node.test)}) THEN ${transformNode(node.consequent)} ELSE ${transformNode(node.alternate)} END)`;
      case 'TemplateLiteral':
        return processTemplateLiteral(node, transformNode);
      case 'TemplateElement':
        return `'${node.value.cooked.replaceAll(/'/g, "''")}'`;
      case 'ArrowFunctionExpression':
        const closureVars = node.params.map(x => x.name)
        return `(${closureVars.join(', ')}) -> ${transformNode(node.body, { ...opts, closureVars })}`;
      default:
        if (context?.log !== false) {
          console.log(JSON.stringify(node, null, 2))
        }
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  }

  return transformTree(node);
}

type DParam = { depth: number, position: number, destuctured?: boolean, excluded?: string[] }
const isWildcardParam = (d: DParam) => {
  return d.depth === 0 && d.position === 0
}
const extractParams = (ast: Expression) => {
  const params = new Map<string, DParam>();

  function walk(node: any, depth: number, position: number) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'ObjectExpression') {
      const excluded = node.properties.filter((e) => e.type === 'Property').map(e => e.key.name)
      const spreadId = node.properties.find((e) => e.type === 'SpreadElement')?.argument?.name
      params.set(spreadId, { depth, position, destuctured: true, excluded });
      excluded.forEach(e => params.set(e, { depth: depth + 1, position }))
      return
    }
    if (node.type === 'Identifier') {
      params.set(node.name, { depth, position });
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((e, i) => walk(e, depth + 1, i));
      return;
    }

    for (const key in node) {
      if (key !== 'type' && typeof node[key] === 'object' && key !== 'key') {
        walk(node[key], depth + 1, position);
      }
    }
  }
  walk(ast, -1, 0);
  return params;
}

export const extractParamsContext = (ast: Expression) => {
  // if (ast.type === 'ConditionalExpression' && ast?.test?.type !== 'ArrowFunctionExpression') {
  //   ast = ast.test
  // }
  if (ast.type !== 'ArrowFunctionExpression') {
    throw new Error('AST is not an ArrowFunctionExpression');
  }
  return extractParams(ast.params as unknown as Expression)
}

type Expr<T> = ((d: T, z: DGlobalField) => any)

export function parse<T extends Record<string, any>>(expr: Expr<T> | string, context = {}) {
  const fnstr = typeof expr === 'string' ? expr : expr.toString()
  const ast = jsep(fnstr) as ArrowFunctionExpression
  const params = extractParamsContext(ast)
  const duckdbExpr = transformDuckdb(ast.body, params, context)
  return duckdbExpr
}

const extractSpreadedParams = (ast: Expression) => {
  const excluded = ast.params[0].properties.filter((e) => e.type === 'Property').map(e => e.key.name)
  const spreadId = ast.params[0]?.properties.find((e) => e.type === 'SpreadElement')?.argument?.name
  return { excluded, spreadId }
}

export function parseObject<T extends Record<string, any>>(expr: Expr<T> | string, context = {}) {
  const fnstr = typeof expr === 'string' ? expr : expr.toString()
  const ast = jsep(fnstr) as ArrowFunctionExpression
  const params = extractParamsContext(ast)
  const node = ast.body
  if (node.type === 'Literal') {
    return [['', '', node.value]]
  }
  if (node.type === 'TemplateLiteral') {
    return [['', '', node.quasis[0]?.value?.cooked]]
  }
  if (node.type === 'Identifier' && params.has(node.name)) {
    const p = params.get(node.name)
    if (p?.depth === 0 && p?.position === 0) {
      return [['', '', '*']]
    }
  }
  if (node.type === 'ObjectExpression') {
    return node.properties.map((prop: any) => {
      if (prop.type === 'SpreadElement') {
        const { excluded, spreadId } = extractSpreadedParams(ast)
        if (prop.argument.name === spreadId) {
          return ['', '', '*' + (excluded?.length ? ` EXCLUDE(${excluded.join(', ')})` : '')]
        }
      }
      return [prop.key?.name, transformDuckdb(prop.value, params, context)]
    });
  } else if (node.type === 'CallExpression' || node.type === 'MemberExpression') {
    const rtn = [['', transformDuckdb(node, params, context)]]
    return rtn
  }
  else if (node.type === 'ArrayExpression') {
    return node.elements.map((prop: any, i) => {
      return [i, transformDuckdb(prop, params, context)]
    });
  }
  else {
    console.log(node)
    throw new Error('AST is not an ObjectExpression');
  }
}