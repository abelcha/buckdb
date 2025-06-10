// ⚡ BuckDB: JavaScript Superpowers Unleashed!
// Advanced JavaScript features that compile to perfect SQL

import { Buck } from '@buckdb/isomorphic'

// Create an in-memory database for our examples
const db = Buck(':memory:', { access_mode: 'AUTOMATIC' })

// ================================
// 🎯 SETUP: Create rich sample data
// ================================

// Create employees table with comprehensive data
await db.create('employees', { replace: true })
    .as([
        { id: 1, first_name: 'Sarah', last_name: 'Connor', preferred_name: null, salary: 120000, department: 'Engineering', performance_score: 4.5, years_experience: 5, is_manager: true, is_active: true, hire_date: '2019-03-15', email: 'sarah.connor@company.com' },
        { id: 2, first_name: 'John', last_name: 'Doe', preferred_name: 'Johnny', salary: 85000, department: 'Sales', performance_score: 4.2, years_experience: 3, is_manager: false, is_active: true, hire_date: '2021-06-01', email: 'john.doe@company.com' },
        { id: 3, first_name: 'Alice', last_name: 'Smith', preferred_name: null, salary: 95000, department: 'Marketing', performance_score: 3.8, years_experience: 4, is_manager: false, is_active: true, hire_date: '2020-09-12', email: 'alice.smith@company.com' },
        { id: 4, first_name: 'Bob', last_name: 'Johnson', preferred_name: 'Bobby', salary: 110000, department: 'Engineering', performance_score: 4.7, years_experience: 7, is_manager: true, is_active: false, hire_date: '2017-01-20', email: 'bob.johnson@company.com' },
        { id: 5, first_name: 'Carol', last_name: 'Williams', preferred_name: null, salary: 75000, department: 'HR', performance_score: 4.0, years_experience: 2, is_manager: false, is_active: true, hire_date: '2022-04-10', email: 'carol.williams@company.com' }
    ])
    .execute()

// ================================
// 🎯 TERNARY OPERATORS - Conditional logic made beautiful
// ================================

const conditionalLogic = await db.from('employees')
    .select(emp => ({
        name: emp.first_name + ' ' + emp.last_name,
        // 🔥 Ternary operators become SQL CASE statements!
        salaryTier: emp.salary > 100000 ? 'Senior' : 
                   emp.salary > 60000 ? 'Mid-level' : 'Junior',
        
        // 🔥 Complex conditions with multiple ternaries
        bonus: emp.department === 'Sales' ? emp.salary * 0.15 :
               emp.department === 'Engineering' ? emp.salary * 0.12 :
               emp.salary * 0.08,
        
        // 🔥 Boolean expressions
        isEligibleForRaise: emp.performance_score > 4.0 && emp.years_experience > 2,
        
        // 🔥 Null coalescing and fallbacks
        displayName: emp.preferred_name ?? emp.first_name,
        
        // 🔥 Template literals with complex logic
        employeeCard: `${emp.first_name} ${emp.last_name} - ${
            emp.is_manager ? '👑 Manager' : '👤 Employee'
        } (${emp.department})`
    }))
    .where(emp => 
        emp.is_active &&                          // Boolean fields
        emp.hire_date > '2020-01-01' &&          // Date comparisons
        (emp.department !== 'Intern' || emp.salary > 0)  // Complex logic
    )
    .execute()

console.log('Conditional Logic Results:', conditionalLogic)

// ================================
// 🚀 DESTRUCTURING & SPREAD - Modern JS patterns
// ================================

const modernJavaScript = await db.from('employees')
    .select(({ salary, first_name, last_name, department, ...emp }) => ({
        // 🔥 Destructuring in action!
        employeeName: first_name + ' ' + last_name,
        cost: salary,
        division: department,
        
        // 🔥 Spread operator magic - include remaining fields
        id: emp.id,
        email: emp.email,
        performance_score: emp.performance_score,
        
        // 🔥 Computed properties
        salaryRange: salary < 80000 ? 'Entry' :
                    salary < 100000 ? 'Mid' : 'Senior',
        
        // 🔥 Complex string manipulation
        emailUsername: first_name.lower() + '.' + last_name.lower(),
        initials: first_name.substr(0, 1) + last_name.substr(0, 1)
    }))
    .execute()

console.log('Modern JavaScript Patterns:', modernJavaScript)

// ================================
// 🎨 REGULAR EXPRESSIONS - Pattern matching power
// ================================

// Create users table for regex examples
await db.create('users_data', { replace: true })
    .as([
        { id: 1, username: 'alice123', email: 'alice.johnson@gmail.com', phone: '+1-555-123-4567', full_name: 'Alice Johnson' },
        { id: 2, username: 'bob_dev', email: 'bob.smith@company.co.uk', phone: '555.987.6543', full_name: 'Bob Smith' },
        { id: 3, username: 'admin', email: 'invalid-email', phone: '123-456-7890', full_name: 'Carol Admin' },
        { id: 4, username: 'test_user', email: 'test@example.org', phone: '+44-20-7946-0958', full_name: 'Test User' },
        { id: 5, username: 'charlie99', email: 'charlie@domain.com', phone: '(555) 111-2222', full_name: 'Charlie Brown' }
    ])
    .execute()

const regexMagic = await db.from('users_data')
    .where(user => 
        user.email.regexp_matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}') &&  // Email validation
        !user.username.regexp_matches('^(admin|root|test)') &&  // Exclude system accounts
        user.phone.len() >= 10  // Basic phone length check
    )
    .select((user, D) => ({
        username: user.username,
        email: user.email,
        
        // 🔥 Extract patterns with regex
        emailDomain: user.email.regexp_extract('@(.+)$', 1),
        
        // 🔥 Clean and format data
        cleanPhone: user.phone.regexp_replace('[^\\d]', '', 'g'),
        
        // 🔥 Complex validation results
        isValidUser: user.email.Like('%@%.%') && 
                    user.username.len() >= 3 &&
                    !user.username.regexp_matches('\\d{4,}'),  // No long number sequences
        
        // 🔥 String transformations
        formattedName: user.full_name.upper(),
        nameLength: user.full_name.len()
    }))
    .execute()

console.log('Regex Pattern Matching:', regexMagic)

// ================================
// 🌊 CHAINED METHODS - Fluent data transformation
// ================================

// Create transactions for method chaining examples
await db.create('transactions', { replace: true })
    .as([
        { id: 1, amount: 1250.75, category: 'ELECTRONICS', merchant_name: 'Best Buy Corp', description: 'Laptop purchase for office', transaction_date: '2024-01-15', status: 'COMPLETED' },
        { id: 2, amount: 45.99, category: 'food_delivery', merchant_name: '  uber eats  ', description: null, transaction_date: '2024-01-16', status: 'completed' },
        { id: 3, amount: 299.00, category: 'CLOTHING', merchant_name: 'Nike Store', description: 'Running shoes and gear', transaction_date: '2024-01-17', status: 'COMPLETED' },
        { id: 4, amount: 12.50, category: 'coffee_shops', merchant_name: 'Starbucks', description: 'Morning coffee', transaction_date: '2024-01-18', status: 'pending' },
        { id: 5, amount: 150.25, category: 'GAS_STATIONS', merchant_name: 'Shell Gas', description: '', transaction_date: '2024-01-19', status: 'COMPLETED' }
    ])
    .execute()

const chainedOperations = await db.from('transactions')
    .select(txn => ({
        // 🔥 Method chaining on strings
        categoryClean: txn.category
            .lower()
            .regexp_replace('[^a-z]', '', 'g')
            .substr(0, 15),
        
        // 🔥 Number formatting
        roundedAmount: txn.amount.round(2),
        amountString: '$' + txn.amount.round(2),
        
        // 🔥 Date manipulations
        formattedDate: txn.transaction_date,
        
        // 🔥 Complex nested operations
        merchantInfo: txn.merchant_name.trim().upper() + ' (' +
                     txn.category.lower().regexp_replace('[_]', ' ', 'g') + ')',
        
        // 🔥 Conditional chaining with null handling
        processedDescription: txn.description !== null && txn.description !== '' 
            ? txn.description.trim().substr(0, 50) + '...'
            : 'No description available',
            
        // 🔥 Status normalization
        normalizedStatus: txn.status.upper(),
        
        // 🔥 Category formatting
        displayCategory: txn.category.lower().regexp_replace('[_]', ' ', 'g')
    }))
    .where(txn => 
        txn.amount > 0 &&
        txn.status.lower() === 'completed' &&
        txn.merchant_name.trim().len() > 0
    )
    .execute()

console.log('Chained Operations:', chainedOperations)

// ================================
// 🎪 ADVANCED EXPRESSIONS - Complex logic combinations
// ================================

const advancedExpressions = await db.from('employees')
    .select((emp, D) => ({
        // 🔥 Nested ternary expressions
        employeeLevel: emp.is_manager ? 'Manager' :
                      emp.years_experience > 5 ? 'Senior' :
                      emp.years_experience > 2 ? 'Mid-level' : 'Junior',
        
        // 🔥 Complex mathematical expressions
        adjustedSalary: emp.salary * (
            emp.performance_score > 4.5 ? 1.15 :
            emp.performance_score > 4.0 ? 1.10 :
            emp.performance_score > 3.5 ? 1.05 : 1.00
        ),
        
        // 🔥 Multi-condition boolean logic
        isHighPerformer: emp.performance_score > 4.2 && 
                        emp.years_experience > 3 && 
                        emp.is_active &&
                        emp.salary > 70000,
        
        // 🔥 String concatenation with conditions
        statusBadge: (emp.is_active ? '🟢 Active' : '🔴 Inactive') + 
                    (emp.is_manager ? ' | 👑 Manager' : '') +
                    (emp.performance_score > 4.5 ? ' | ⭐ Top Performer' : ''),
        
        // 🔥 Complex email domain logic
        emailProvider: emp.email.Like('%@gmail.%') ? 'Gmail' :
                      emp.email.Like('%@company.%') ? 'Corporate' :
                      emp.email.Like('%@outlook.%') ? 'Outlook' : 'Other',
        
        // 🔥 Date-based calculations
        tenureYears: D.current_date().year() - D.year(emp),
        
        // 🔥 Performance tier with multiple criteria
        performanceTier: emp.performance_score > 4.5 && emp.years_experience > 5 ? 'Elite' :
                        emp.performance_score > 4.0 && emp.years_experience > 3 ? 'High' :
                        emp.performance_score > 3.5 ? 'Good' : 'Developing'
    }))
    .where(emp => emp.is_active)
    .orderBy(emp => emp.performance_score, 'DESC')
    .execute()

console.log('Advanced Expressions:', advancedExpressions)

/*
🚀 What makes this magical?

✨ COMPILE-TIME SAFETY: TypeScript catches errors before runtime
✨ INTELLIGENT PARSING: BuckDB understands JavaScript semantics
✨ SQL OPTIMIZATION: Your JS code becomes optimized SQL queries
✨ ZERO LEARNING CURVE: Use JavaScript you already know
✨ POWERFUL ABSTRACTION: Complex SQL concepts in simple JS syntax

🎯 Next level: Check out joins, aggregations, and data pipeline examples!
*/

console.log('⚡ JavaScript superpowers activated in SQL!')
