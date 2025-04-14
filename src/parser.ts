import { Identifier } from 'jsep';
import jsep, { ArrowFunctionExpression, Expression, Property } from './jsep';
import { PatternMatchers } from './utils'

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

const SLASH = String.fromCharCode(47)
const BACKSLASH = String.fromCharCode(92)
export function transformDuckdb(node, params = new Map<string, number>(), context = {}) {
  // const contextStr = Object.entries(context).map(([key, value]) => `const ${key} = ${JSON.stringify(value)}`).join(';\n') + '\n'

  function transformNode(node, opts = { asArray: false }) {
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
          else if (typeof global[node.name] !== 'undefined') {
            return `${node.name}`
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
        const rtn = [transformNode(node.object), transformNode(node.property)].filter(Boolean)
        return opts.asArray ? rtn : rtn.join('.');
      case 'Literal':
        // console.log(node.value instanceof RegExp)
        if (node.value instanceof RegExp) {
          const rgx = node.value.toString().split(SLASH).slice(1, -1).join(SLASH)
          const flags = node.value.flags ? `, '${node.value.flags}'` : ''
          return `'${rgx}'` + flags
        }
        if (node.raw.startsWith('"') && node.raw.endsWith('"')) {
          return `'${node.raw.slice(1, -1).replace(/'/g, BACKSLASH + "'")}'`
        }
        return node.raw;
      case 'CallExpression':
        const callee = transformNode(node.callee, { asArray: true })
        const lastCallee = callee[callee.length - 1]
        const args = node.arguments.map(transformNode)

        if (PatternMatchers[lastCallee]) {
          return `${callee.slice(0, -1)} ${PatternMatchers[lastCallee]} ${args[0]}`
        }
        if (lastCallee === 'as') {
          console.log(node)
          const gargs = node.arguments.slice(1).map(transformNode)
          // console.log({gargs})
          return `${callee.slice(0, -1)}::${node.arguments[0].value}` + (gargs?.length ? ('(' + gargs.join(', ') + ')') : '')
        }
        if (callee[0].toLowerCase() === 'cast' && node.arguments.length === 2) {
          return `CAST(${transformNode(node.arguments[0])}, ${node.arguments[1].value})`
        }
        // if (PatternMatchers[callee]) {
        //   return '123'
        // }
        // console.log({ callee, args })
        return `${callee.join('.')}(${node.arguments.map(transformNode).join(' ,')})`;
      // try {
      //   const evalStr = `${transformNode(node.callee)}(${node.arguments.map(transformNode).join(', ')})`
      //   const result = eval(contextStr + evalStr);
      //   return String(result);
      // } catch {
      //   // Fallback to original if evaluation fails
      //   return `${transformNode(node.callee)}(${node.arguments.map(transformNode).join(', ')})`;
      // }
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
  // console.log(ast)
  if (ast.type !== 'ArrowFunctionExpression') {
    throw new Error('AST is not an ArrowFunctionExpression');
  }
  return extractParams(ast.params as unknown as Expression)
}


export const parse = (expr: Function, context = {}) => {
  const ast = jsep(expr.toString()) as ArrowFunctionExpression
  // console.log(ast)
  const params = extractParamsContext(ast)
  // const context = findUndefinedVariables(ast, {})
  const duckdbExpr = transformDuckdb(ast.body, params, context)
  return duckdbExpr
}

export const parseObject = (expr: Function, context = {}) => {
  const ast = jsep(expr.toString()) as ArrowFunctionExpression
  // console.log('----', expr.toString())
  // console.log(ast)
  const params = extractParamsContext(ast)
  const node = ast.body
  // console.log(node)
  if (node.type === 'ObjectExpression') {
    // console.log(node.properties)
    return node.properties.map((prop: any) => {
      return [prop.key?.name, transformDuckdb(prop.value, params, context)]
    });
  } else if (node.type === 'CallExpression' || node.type === 'MemberExpression') {
    // console.log(node)
    const rtn = [['', transformDuckdb(node, params, context)]]
    // console.log({ rtn })
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


// // const lol = () => toto === /qds/

// // console.log({ ArrowFunctionExpression })
// // const ast = jsep(`Date.now() > 42 && (D.abs(p.age) === p.total && p.hh.regexp_matches(/123/, '')) && D.cos(99) === 12 && D.regexp_matches(p.name, /abel/, '')`)
// // const ast = jsep(`a + b + (d / c) && (12 === 12 || toto === 12)`)
// // const fn = ({ xx: { zz } }) => ((12 + zz) / 4 && &&  zz === 'string')
// // const fn = (p, { Varchar, ...rest }) => p && tata() && rest.xx.Varchar(p.name) === 'lol' && Date.now() > 0 && JSON.stringify(lola) && toto[0].lol.tata
// const fn = () => Date.now() > 42 && JSON.stringify(lola) === 'toto'
if (import.meta.main) {

  const fn = (e, D) => D.cast(D.lol(e.name.a.haha()).str(), 'VARCHAR') && e.tata.lolo.as('Varchar') && e.name.similarTo(`123`) && e.name.toto.lol.notLike('%toot%')

  // const fn = (p, D) => ({
  //   age: p.age,
  // diff: D.levenstein(p.name, 123)
  // })
  // console.log(parseObject(fn))
  console.log(parse(fn))
}

// // console.log(fn.toString())
// const ast = jsep(fn.toString())
// const params = extractParamsContext(ast)
// // // console.log({ params })
// // // console.log(global.Math)
// // console.log(JSON.stringify(ast.body, null, 2))
// // // console.log(JSON.stringify(ast, null, 2))
// // // console.info('>>>', {ast})

// console.log(transformDuckdb(ast.body, params, { customVar: 42, lola: 'nano' }))
// // // const zz = ast ~= 'toto'
// // // const fn = (v, D) => D.Varchar(v) + 12
// // // console.log(fn.toString())
