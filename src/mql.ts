/**
 * MQL (MongoDB Query Language) style query operators for where() method
 * 
 * Supports basic comparison operators:
 * - $gt: greater than
 * - $gte: greater than or equal
 * - $lt: less than
 * - $lte: less than or equal
 * - $eq: equal
 * - $ne: not equal
 * - $in: in array
 * - $nin: not in array
 * - $regex: regex match (or use /pattern/ directly)
 */

export type MqlOperators = {
    $gt?: any
    $gte?: any
    $lt?: any
    $lte?: any
    $eq?: any
    $ne?: any
    $in?: any[]
    $nin?: any[]
    $regex?: string | RegExp
}

export type MqlQuery = {
    [field: string]: MqlOperators | any
}

/**
 * Convert an MQL query object to SQL WHERE clause
 */
export function mqlToSql(query: any): string {
    const conditions: string[] = []

    for (const [field, value] of Object.entries(query)) {
        if (value === null || value === undefined) {
            conditions.push(`${field} IS NULL`)
            continue
        }

        // Check if it's a RegExp literal
        if (value instanceof RegExp) {
            const pattern = value.source
            conditions.push(`regexp_matches(${field}, '${pattern.replace(/'/g, "''")}')`)
            continue
        }

        // Check if it's an operator object
        if (typeof value === 'object' && !Array.isArray(value)) {
            const operators = value as MqlOperators
            
            for (const [op, opValue] of Object.entries(operators)) {
                switch (op) {
                    case '$gt':
                        conditions.push(`${field} > ${formatValue(opValue)}`)
                        break
                    case '$gte':
                        conditions.push(`${field} >= ${formatValue(opValue)}`)
                        break
                    case '$lt':
                        conditions.push(`${field} < ${formatValue(opValue)}`)
                        break
                    case '$lte':
                        conditions.push(`${field} <= ${formatValue(opValue)}`)
                        break
                    case '$eq':
                        conditions.push(`${field} = ${formatValue(opValue)}`)
                        break
                    case '$ne':
                        conditions.push(`${field} != ${formatValue(opValue)}`)
                        break
                    case '$in':
                        if (Array.isArray(opValue)) {
                            const values = opValue.map(formatValue).join(', ')
                            conditions.push(`${field} IN (${values})`)
                        }
                        break
                    case '$nin':
                        if (Array.isArray(opValue)) {
                            const values = opValue.map(formatValue).join(', ')
                            conditions.push(`${field} NOT IN (${values})`)
                        }
                        break
                    case '$regex':
                        if (opValue instanceof RegExp) {
                            const pattern = opValue.source
                            conditions.push(`regexp_matches(${field}, '${pattern.replace(/'/g, "''")}')`)
                        } else if (typeof opValue === 'string') {
                            conditions.push(`regexp_matches(${field}, '${opValue.replace(/'/g, "''")}')`)
                        }
                        break
                    default:
                        throw new Error(`Unsupported operator: ${op}`)
                }
            }
        } else {
            // Direct value comparison
            conditions.push(`${field} = ${formatValue(value)}`)
        }
    }

    return conditions.join(' AND ')
}

function formatValue(value: any): string {
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false'
    }
    if (value === null) {
        return 'NULL'
    }
    return String(value)
}

/**
 * Check if an object is an MQL query
 */
export function isMqlQuery(obj: any): obj is MqlQuery {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return false
    }

    // Check if any value contains MQL operators
    for (const value of Object.values(obj)) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const keys = Object.keys(value)
            if (keys.some(k => k.startsWith('$'))) {
                return true
            }
        }
    }

    // Also consider it an MQL query if it's a plain object with field names
    // This allows { age: 25 } style queries
    return Object.keys(obj).length > 0
}

