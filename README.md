# BuckDB: Write SQL Like You Write JavaScript 🚀

**Tired of messy SQL strings, lack of type safety, and awkward syntax when querying databases in JavaScript/TypeScript?**

BuckDB transforms your database interactions by letting you build powerful SQL queries using familiar, fluent JavaScript syntax. Leverage DuckDB's analytical power without sacrificing developer experience.

**Why BuckDB?**

- **Fluent & Readable:** Chain methods like `.select()`, `.where()`, `.join()`, `.orderBy()` to build queries naturally. No more complex string concatenation!
- **Write JavaScript, Get SQL:** Use standard JavaScript arrow functions, operators (`===`, `&&`, `||`, `>`), template literals, and even ternary operators directly within your queries. BuckDB intelligently parses them into efficient SQL.
- **Type Safety (TypeScript):** Catch errors at compile time, not runtime. BuckDB provides strong typing for query construction and can even generate interfaces based on your schema (Node.js).
- **Seamless DuckDB Integration:** Easily access DuckDB's rich function library, perform casting, and utilize features like reading/writing various file formats (Parquet, CSV, JSON) and connecting to S3.
- **Works Everywhere:** Provides adapters for both Node.js (`@duckdb/node-api`) and WASM environments (`@duckdb/duckdb-wasm` - Browsers, Bun, Deno).

---

## Installation

```bash
# Choose your environment
npm install buckdb @duckdb/node-api  # For Node.js
# or
npm install buckdb @duckdb/duckdb-wasm # For Browser/WASM
```

---

## Getting Started: A Taste of BuckDB

```typescript
// Import based on your environment
import { from } from 'buckdb' // or 'buckdb.wasm'

// Find active users older than 25 from a CSV file
async function getActiveUsers() {
    const users = await from('data/users.csv') // Read directly from CSV
        .where(user => user.age > 25 && user.status === 'active') // Use JS expressions!
        .select(user => ({ // Select specific fields
            id: user.id,
            userName: user.name,
            registrationDate: user.registered_at,
        }))
        .orderBy(['registrationDate', 'DESC']) // Order results
        .limit(50)
        .execute() // Run the query

    console.log(users)
    // Example Output:
    // [
    //   { id: 123, userName: 'Alice', registrationDate: 2023-10-26T... },
    //   { id: 456, userName: 'Bob',   registrationDate: 2023-10-25T... },
    //   ...
    // ]
}

getActiveUsers()
```

---

## Key Features

### 1. Fluent Query Construction

Build complex queries step-by-step in a readable way.

```typescript
import { from } from 'buckdb'

async function complexQuery() {
    const results = await from('products', 'p') // Alias 'p'
        .join('categories', 'c').on(c => c.id === p.category_id) // Join tables
        .leftJoin('reviews', 'r').on(r => r.product_id === p.id) // Left Join
        .where(p => p.price > 100 && p.stock > 0) // Multiple conditions
        .groupBy(p => p.category_id) // Group results
        .select((p, c, r) => ({ // Select from multiple tables (aliases match join order)
            categoryName: c.name,
            averagePrice: 'AVG(p.price)', // Mix JS access and SQL functions
            reviewCount: 'COUNT(r.id)',
        }))
        .having((p, c, r) => 'COUNT(r.id) > 5') // Having clause
        .orderBy(['averagePrice', 'DESC'])
        .limit(10)
        .execute()

    console.log(results)
}
```

### 2. JavaScript Expressions => SQL Magic ✨

Write conditions and select clauses using familiar JavaScript syntax. BuckDB handles the translation.

```typescript
import { from } from 'buckdb'

const minStock = 5
const searchTerm = 'Gadget'

await from('products', 'p')
    .context({ minStock, searchTerm }) // Pass external variables safely
    .where((p, D) =>
        // 'D' provides access to DuckDB functions
        (p.name.Like(`%${searchTerm}%`) || p.description.Ilike(`%${searchTerm}%`)) // LIKE/ILIKE
        && p.stock >= minStock // Use context variable
        && p.price < (p.category === 'Electronics' ? 500 : 1000) // Ternary -> CASE WHEN
        && D.regexp_matches(p.sku, /^[A-Z]{3}-\d{5}$/) // DuckDB regex function
    )
    .select(p => ({
        productRef: `SKU-${p.sku}`, // Template literal
        discountedPrice: p.price * 0.9, // Arithmetic
        descriptionExcerpt: p.description.substring(0, 50) + '...', // String manipulation
    }))
    .execute()
```

### 3. Type Safety (TypeScript)

Define schemas or let BuckDB generate them (Node.js) for compile-time checks and autocompletion.

```typescript
// Conceptual Example (Schema definition might vary)
interface Product {
    id: number
    name: string
    price: number
    // ... other fields
}

// BuckDB aims to provide type hints based on schema
await from<Product>('products') // Specify type
    .where(p => p.priçe > 100) // Typo 'priçe' could be caught by TS!
    .select(p => ({ productName: p.name }))
    .execute()
```

_(**Note:** Full type safety often relies on schema definition or the Node.js interface generator)_

### 4. Read/Write Diverse Sources

Directly query files (CSV, Parquet, JSON) locally, via HTTP(S), or on S3. Use `copy()` to export results.

```typescript
import { copy, from } from 'buckdb'

// Read from S3 (requires AWS extension & credentials configured)
const s3Data = await from('s3://my-bucket/data.parquet').limit(10).execute()

// Read from URL
const webData = await from('https://example.com/data.csv').where(row => row.value > 0).execute()

// Copy query results to a compressed CSV file
const queryResult = from('my_table').where(e => e.status === 'processed')
await copy(queryResult).to('output/processed_data.csv.gz', {
    format: 'csv',
    header: true,
    compression: 'gzip',
    delimiter: ';',
})

// Copy to S3
await copy(queryResult).to('s3://my-output-bucket/results.parquet', {
    format: 'parquet',
    allow_overwrite: true,
})
```

### 5. DuckDB Functions & Casting

Access DuckDB's powerful function library and perform type casting easily.

```typescript
import { from } from 'buckdb'

await from('sensor_readings', 'sr')
    .select((sr, D) => ({ // Use 'D' for DuckDB functions/types
        readingId: sr.id,
        timestampDate: D.Date(sr.timestamp), // Cast to Date
        valueCelsius: (sr.valueFahrenheit - 32) * 5 / 9, // Calculation
        valueRounded: D.round(sr.valueRaw, 2), // Round function
        sensorType: sr.type.upper(), // String function
        isValid: sr.quality.In(['GOOD', 'FAIR']), // IN operator
        processedValue: sr.valueRaw.as('DECIMAL(10, 4)'), // Fluent casting
    }))
    .execute()
```

### 6. Environment Adapters

BuckDB automatically uses the correct DuckDB backend. Just import from the right entry point:

- `import { from } from 'buckdb';` -> Uses `@duckdb/node-api` (for Node.js)
- `import { from } from 'buckdb.wasm';` -> Uses `@duckdb/duckdb-wasm` (for Browser, Bun, Deno)

---

BuckDB empowers you to write clean, safe, and efficient database queries in your JavaScript/TypeScript projects. Give it a try!
