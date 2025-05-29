import { DMetaField } from '../.buck/types'
import jsep, { ArrayExpression, ArrowFunctionExpression, BinaryExpression, CallExpression, ConditionalExpression, Expression, Identifier, Literal, MemberExpression, ObjectExpression, Property, SequenceExpression, SpreadElement, TemplateElement, TemplateLiteral, UnaryExpression } from './jsep'
import { LitteralTypesMap, PatternMatchers, PolyfillMapping, UnmethodMapping } from './typedef'
import { wrap, Ω } from './utils'

const RegexpFuncsWthOptions = new Map([
  ['regexp_extract', 3],
  ['regexp_extract_all', 3],
  ['regexp_replace', 3],
  ['regexp_matches', 2],
  ['regexp_full_matches', 2],
])

const UnaryOperatorMap = new Map([
  ['!!', 'NOTNULL'],
  ['!', 'NOT'], // Logical negation
  ['-', '-'], // Numeric negation
  ['+', '+'], // Unary plus (no change needed)
  ['~', '~'], // Bitwise NOT (DuckDB supports this)
])

function mapUnaryOperator(jsOperator: any) {
  if (!UnaryOperatorMap.has(jsOperator)) {
    throw new Error(`Unsupported unary operator: ${jsOperator}`)
  }
  return UnaryOperatorMap.get(jsOperator)
}

const OperatorMap = new Map([
  ['==', '='],
  ['!=', '!='],
  ['===', '='],
  ['!==', '!='],
  ['??', 'COALESCE'],
  ['+', '+'],
  ['-', '-'],
  ['*', '*'],
  ['/', '/'],
  ['%', '%'],
  ['&&', 'AND'],
  ['||', 'OR'],
  ['>', '>'],
  ['<', '<'],
  ['>=', '>='],
  ['<=', '<='],
  ['in', 'IN'],
])
function mapOperator(jsOperator: any) {
  if (!OperatorMap.has(jsOperator)) {
    throw new Error(`Unsupported operator: ${jsOperator}`)
  }
  return OperatorMap.get(jsOperator)
}

const joinMembers = (members: any[]) => {
  if (!Array.isArray(members)) {
    return members
  }
  return members?.reduce?.((acc, member) => {
    if (!acc) return member

    if (typeof member === 'number') {
      return acc + '[' + member.toString().replace('.', ':') + ']'
    }
    if (member instanceof Number && 'raw' in member) {
      return acc + '[' + (member as any).raw.replace('.', ':') + ']'
    }
    if (member?.startsWith("'") && member?.endsWith("'")) {
      return acc + `[${member}]`
    }
    return acc + '.' + member
  }, '')
}

const SLASH = String.fromCharCode(47)
const BACKSLASH = String.fromCharCode(92)
// Helper function to check if a node is or contains a string literal
function hasStringLiteral(node: BinaryExpression | Expression): boolean {
  if (!node) return false
  // Check for nested string literals in binary expressions
  if (node.type === 'BinaryExpression') {
    return hasStringLiteral(node.left) || hasStringLiteral(node.right)
  }
  // Direct string literal
  return node.type === 'Literal' && typeof node.value === 'string'
}

// Helper function to recursively transform string concatenation
function transformStringConcat(node: any, transformer: any, isTopLevel = true): any {
  // If not a binary expression or not addition, process normally
  if (node.type !== 'BinaryExpression' || node.operator !== '+') {
    return transformer(node)
  }

  // Recursively process left and right sides
  const left = transformStringConcat(node.left, transformer, false)
  const right = transformStringConcat(node.right, transformer, false)

  // Always use || for concatenation in binary expressions that contain strings
  const result = `${left} || ${right}`
  return isTopLevel ? `(${result})` : result
}
// Process template literal parts into SQL concatenation
function processTemplateLiteral(
  node: TemplateLiteral,
  transformer: (node: Expression) => string,
): string {
  if (node.expressions.length === 0) {
    // Simple template literal without expressions
    const cooked = node.quasis[0]?.value?.cooked ?? node.quasis[0]?.value?.raw
    if (cooked === undefined) {
      throw new Error('TemplateLiteral quasis[0].value.cooked is undefined.')
    }
    return `'${cooked.replaceAll(/'/g, "''")}'`
  }

  // Template literal with expressions - use SQL string concatenation with ||
  const parts: string[] = []

  // Process each part of the template literal
  for (let i = 0; i < node.quasis.length; i++) {
    const quasi = node.quasis[i]
    if (!quasi) {
      throw new Error(`Template literal has undefined quasi at index ${i}`)
    }
    // Only add non-empty string parts
    if ((quasi.value.cooked ?? quasi.value.raw) !== '') {
      parts.push(`'${(quasi.value.cooked ?? quasi.value.raw).replaceAll(/'/g, "''")}'`)
    }

    // Add expression if not at the end
    if (!quasi.tail) {
      const expr = transformer(node.expressions[i] as Expression)

      // If the expression contains binary operators, ensure it's properly parenthesized
      if (node.expressions[i]?.type === 'BinaryExpression' && !expr.startsWith('(')) {
        parts.push('(' + expr + ')')
      } else {
        parts.push(expr)
      }
    }
  }

  // Join all parts with the SQL concatenation operator
  return `(${parts.join(' || ')})`
}

type Topts = {
  isFuncArg?: boolean
  closureVars?: string[]
}

// type oProps = { subMemberExpression?: boolean, isProperty?: boolean }
export function transformDuckdb(node: Expression, params = new Map<string, { depth: number; position: number }>(), context: Record<string, any> = {}) {
  function transformTree(node: Expression, opts: Topts = { isFuncArg: false }): any {
    const transformNode = (n: any, o = {}) => transformTree(n, Object.assign(opts, o))
    // const transform = (node: any, ..._: any[]) => transformNode(node)
    const MapFunc = {
      ObjectExpression(node: ObjectExpression) {
        return `{${node.properties.map(transformNode).join(', ')}}`
      },
      Property(node: Property) {
        return `${transformNode({ ...node.key, isProperty: true })}: ${transformNode(node.value)}`
      },
      SequenceExpression(node: SequenceExpression) {
        return node.expressions.map(transformNode).join(', ')
      },
      Identifier(node: Identifier) {
        if (!node.isProperty) {
          if (params.has(node.name)) {
            if (params.get(node.name)?.depth === 0) {
              return null
            }
            return node.name
          } else if (opts.closureVars?.includes(node.name)) {
            return node.name
          } else if (typeof globalThis[node.name] !== 'undefined') {
            return `${node.name}`
          } else if (typeof context[node.name] !== 'undefined') {
            return '(' + JSON.stringify(context[node.name]).replaceAll(/'/g, "''").replaceAll(/\"/g, "'") + ')'
          } else {
            throw new Error(`Undefined variable: ${node.name}, use .context({ ${node.name} }) too pass it down`)
          }
        }
        return node.name
      },
      MemberExpression(node: MemberExpression) {
        node as MemberExpression
        const hasSubMember = node.object?.type === 'MemberExpression'
        if (hasSubMember && node.property.type === 'Identifier' && !node.subMemberExpression && node.property.name === 'length') {
          node.property.name = 'len()' // tmp
        }
        if (hasSubMember) {
          node.object.subMemberExpression = true
        }
        if (node.property.type === 'UnaryExpression' && node.property.operator === '-' && node.property.argument?.type === 'Literal' && node.property.argument.valueType === 'number' && typeof node.property.argument.value === 'number') {
          node.property = {
            type: 'Literal',
            value: -node.property.argument.value,
            raw: '-' + node.property.argument.raw,
            valueType: 'number',
          }
          return transformNode(node)
        }
        node.property.isProperty = true
        const rtn = [transformNode(node.object), transformNode(node.property)].filter(Boolean).flatMap(x => x) as string[]
        // @ts-ignore
        return opts.isFuncArg && node.accessor !== '[' ? rtn : joinMembers(rtn)
      },
      Literal(node: Literal) {
        node = node as Literal
        if (node.value instanceof RegExp) {
          const value = node.value as RegExp
          const rgx = node.value.toString().split(SLASH).slice(1, -1).join(SLASH)
          const flags = false && opts.isFuncArg && value.flags ? `, '${value.flags}'` : ''
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
        return node.raw
      },
      CallExpression(node: CallExpression) {
        if (node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier' && PolyfillMapping[node.callee.property.name]) {
          node.callee.property.name = PolyfillMapping[node.callee.property.name]
        }
        const calleeArr = transformNode(node.callee, { isFuncArg: true })
        const lastCallee = calleeArr[calleeArr.length - 1]
        // let args = node.arguments.map(e => transformNode(e, { isFuncArg: true }))
        let args = node.arguments.map(e => joinMembers(transformNode(e, { isFuncArg: true }) || []))
        // console.log({ argsx })

        if (RegexpFuncsWthOptions.has(lastCallee)) {
          const offset = RegexpFuncsWthOptions.get(lastCallee) as number
          const index = node.arguments.findIndex((e) => e?.type === 'Literal' && e.value instanceof RegExp)
          if (index >= 0) {
            // const pargs = node.arguments.slice(index)
            if (offset === 3 && node.arguments.length === index + 1) {
              args.push('0')
            }
            if (node.arguments.length - offset < index) {
              let value = (node.arguments[index] as Literal)?.value
              if (value instanceof RegExp && value.flags) {
                args.push(wrap(value.flags, "'"))
              }
            }
          }
        }
        const firstValue = (node.arguments[0] as Literal)?.value
        const secValue = (node.arguments[1] as Literal)?.value

        if (UnmethodMapping[lastCallee]) {
          const gargs = node.arguments.map(transformNode)
          if (node.arguments?.[0]?.type === 'ArrowFunctionExpression') {
            return UnmethodMapping[lastCallee](`${calleeArr.slice(0, -1).join('.')}, ${gargs.join(', ')}`);
          }
          return UnmethodMapping[lastCallee](`${calleeArr.slice(0, -1).join('.')}, ${gargs.join(', ')}`)
        }
        if (PatternMatchers[lastCallee]) {
          const { keyword, joinWith } = PatternMatchers[lastCallee]
          if (node.callee.type === 'MemberExpression' && node.callee.object?.type === 'Identifier' && params.has(node.callee.object.name)) {
            return `${args[0]} ${keyword} ${args.slice(1).join(joinWith)}`
          }
          if (lastCallee in Ω('SimilarTo', 'regexp_matches') && firstValue instanceof RegExp && firstValue.flags) {
            return `regexp_matches(${calleeArr.slice(0, -1)}, ${args[0]}, '${firstValue?.flags}')`
          }
          return `${calleeArr.slice(0, -1)} ${keyword} ${args.join(joinWith)}`
        }
        if (lastCallee === 'as') {
          const gargs = node.arguments.slice(1).map(transformNode)
          return `${calleeArr.slice(0, -1)}::${firstValue}` + (gargs?.length ? ('(' + gargs.join(', ') + ')') : '')
        }

        if (typeof calleeArr[0] === 'string' && calleeArr[0].toLowerCase() === 'cast' && node.arguments.length >= 2) {
          const supp = args.length > 2 ? `(${node.arguments.map((e: any) => e.value).slice(2).join(', ')})` : ''
          return `CAST(${args[0]} AS ${secValue}${supp})`
        }
        if (LitteralTypesMap.has(lastCallee) && node.callee.type === 'MemberExpression' && node.callee.object.type === 'Identifier' && params.get(node.callee.object.name)?.position === 1) {
          const toType = LitteralTypesMap.get(lastCallee)
          if (toType === '') {
            return `(${args[0]})`
          }
          return `CAST(${args[0]} AS ${toType})`
        }
        if (lastCallee === 'count' && node.arguments.length === 1 && node.arguments[0].type === 'Literal' && node.arguments[0]?.value === '*') {
          args = ['*']
        }
        // console.log({ args })
        return `${joinMembers(calleeArr)}(${args.join(', ')})`
      },
      UnaryExpression(node: UnaryExpression) {
        if (node.operator === '!!') {
          return `${transformNode(node.argument)} IS NOT NULL`
        }
        if (node.operator === '!' && node.argument.type === 'Literal' && typeof node.argument.value === 'number') {
          return !node.argument.value
        }
        if (node.operator === '!' && node.argument.type === 'CallExpression' && node.argument.callee.type === 'MemberExpression' && node.argument.callee.property.type === 'Identifier' && node.argument.callee.property?.name === 'IsNull') {
          return transformNode(node.argument).replace('IS NULL ', 'IS NOT NULL')
        }
        return `${mapUnaryOperator(node.operator)} ${transformNode(node.argument)}`
      },
      BinaryExpression(node: BinaryExpression) {
        if (node.operator === '??') {
          return `COALESCE(${transformNode(node.left)}, ${transformNode(node.right)})`
        }
        if (node.operator === 'in' && node.right.type === 'ArrayExpression') {
          return `${transformNode(node.left)} IN (${node.right.elements.map(transformNode).join(', ')})`
        }
        // Special handling for string concatenation
        if (node.operator === '+' && hasStringLiteral(node)) {
          return transformStringConcat(node, transformNode)
        }
        if (node.operator === '==' || node.operator === '===' && node.right.type === 'Literal' && node.right?.raw === 'null') {
          return `${transformNode(node.left)} IS NULL`
        }

        // Regular binary operation
        const b = `${transformNode(node.left)} ${mapOperator(node.operator)} ${transformNode(node.right)}`
        return node.parenthesis ? `(${b})` : b
      },
      ArrayExpression(node: ArrayExpression) {
        return `[${node.elements.map(transformNode).join(', ')}]`
      },
      SpreadElement(node: SpreadElement) {
        return `...${transformNode(node.argument)}`
      },
      ConditionalExpression(node: ConditionalExpression) {
        const getCondition = () => {
          if (node.test.type === 'UnaryExpression' && node.test.operator === '!') {
            return transformNode(node.test.argument) + ' IS NULL'
          }
          if (node.test.type in Ω('MemberExpression', 'Identifier')) {
            return transformNode(node.test) + ' IS NOT NULL'
          }
          return transformNode(node.test)
        }
        node = node as ConditionalExpression
        return `(CASE WHEN (${getCondition()}) THEN ${transformNode(node.consequent)} ELSE ${transformNode(node.alternate)} END)`
      },
      TemplateLiteral(node: TemplateLiteral) {
        return processTemplateLiteral(node, transformNode)
      },
      TemplateElement(node: TemplateElement) {
        return `'${(node as TemplateElement).value.cooked?.replaceAll(/'/g, "''")}'`
      },
      ArrowFunctionExpression(node: ArrowFunctionExpression) {
        const closureVars = (node.params || []).map(x => (x as Identifier).name)
        return `(${closureVars.join(', ')}) -> ${transformNode(node.body, { ...opts, closureVars })}`
        // default:
      },
    }

    if (!(node?.type in MapFunc)) {
      if (context?.log !== false) {
        console.log(JSON.stringify(node, null, 2))
      }
      throw new Error(`Unsupported node type: ${node.type}`)
    }
    // @ts-ignore
    return MapFunc[node.type](node)
  }
  return transformTree(node)
}

type DParam = { depth: number; position: number; destuctured?: boolean; excluded?: string[] }
const isWildcardParam = (d: DParam) => {
  return d.depth === 0 && d.position === 0
}
const extractParams = (ast: Expression) => {
  const params = new Map<string, DParam>()

  function walk(node: Expression, depth: number, position: number) {
    if (!node || typeof node !== 'object') return

    if (node.type === 'ObjectExpression') {
      node = node as ObjectExpression
      const excluded = node.properties.filter((e) => e.type === 'Property').map((e: Property) => e.key.name)
      const spreadId = (node.properties.find((e) => e.type === 'SpreadElement') as SpreadElement)?.argument?.name
      params.set(spreadId, { depth, position, destuctured: true, excluded })
      excluded.forEach(e => params.set(e, { depth: depth + 1, position }))
      return
    }
    if (node.type === 'Identifier') {
      params.set(node.name, { depth, position })
      return
    }

    if (Array.isArray(node)) {
      node.forEach((e, i) => walk(e, depth + 1, i))
      return
    }

    for (const key in node) {
      if (key !== 'type' && typeof node[key] === 'object' && key !== 'key') {
        walk(node[key] as unknown as Expression, depth + 1, position)
      }
    }
  }
  walk(ast, -1, 0)
  return params
}

export const extractParamsContext = (ast: Expression) => {
  // if (ast.type === 'ConditionalExpression' && ast?.test?.type !== 'ArrowFunctionExpression') {
  //   ast = ast.test
  // }
  if (ast.type !== 'ArrowFunctionExpression') {
    throw new Error('AST is not an ArrowFunctionExpression')
  }
  return extractParams(ast.params as unknown as Expression)
}

type Expr<T> = (d: T, z: DMetaField) => any

export function parse<T extends Record<string, any>>(expr: Expr<T> | string | Function, context = {}) {
  const fnstr = typeof expr === 'string' ? expr : expr.toString()
  const ast = jsep(fnstr) as ArrowFunctionExpression
  const params = extractParamsContext(ast)
  const duckdbExpr = transformDuckdb(ast.body, params, context)
  return duckdbExpr
}

const extractSpreadedParams = (ast: ArrowFunctionExpression) => {
  if (ast.params === null) {
    return { excluded: [], spreadId: undefined }
  }
  // console.log("xxx", ast.params[0])
  if (ast.params[0].type === 'Identifier') {
    ast.params[0] = {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'SpreadElement',
          argument: ast.params[0],
        },
      ],
    }
  }
  if (ast.params[0]?.type !== 'ObjectExpression') {
    throw new Error('AST param is not an ObjectExpression (?)')
  }
  const excluded = ast.params[0].properties.filter((e) => e.type === 'Property').map(e => e.key.name)
  const spreadId = ast.params[0]?.properties.find((e) => e.type === 'SpreadElement')?.argument?.name
  return { excluded, spreadId }
}

const handleExcluded = ({ excluded }: { excluded: string[] } & any) => {
  return ['', '', '*' + (excluded?.length ? ` EXCLUDE(${excluded.join(', ')})` : '')]
}

export function parseObject<T extends Record<string, any>>(expr: Expr<T> | string | Function, context = {}) {
  const fnstr = typeof expr === 'string' ? expr : expr.toString()
  const ast = jsep(fnstr) as ArrowFunctionExpression

  const params = extractParamsContext(ast)
  const node = ast.body
  if (node.type === 'Literal') {
    return [['', '', node.value]]
  }
  if (node.type === 'TemplateLiteral') {
    return [['', '', transformDuckdb(node, params, context)]]
  }
  if (node.type === 'Identifier' && params.has(node.name)) {
    const p = params.get(node.name)
    // console.log(p)
    if (p?.destuctured && p?.excluded?.length) {
      return [handleExcluded(p)]
    }
    if (p?.depth === 0 && p?.position === 0) {
      return [['', '', '*']]
    }
  }
  if (node.type === 'ObjectExpression') {
    return node.properties.map((prop: any) => {
      // console.log('prop', prop)
      if (prop.type === 'SpreadElement') {
        const { excluded, spreadId } = extractSpreadedParams(ast)
        // console.log({ excluded, spreadId })
        if (prop.argument.name === spreadId) {
          return handleExcluded({ excluded })
        }
      }
      return [prop.key?.name, transformDuckdb(prop.value, params, context)]
    })
  } else if (node.type === 'CallExpression' || node.type === 'MemberExpression') {
    const rtn = [[null, transformDuckdb(node, params, context)]]
    return rtn
  } else if (node.type === 'ArrayExpression') {
    return node.elements.map((prop: any, i) => {
      return [i, transformDuckdb(prop, params, context)]
    })
  } else {
    return [['', transformDuckdb(node, params, context)]]
  }
}
