# Project Summary: BuckDB - A Fluent SQL Query Builder for JavaScript/TypeScript

**The Big Picture: Why BuckDB?**

Writing SQL queries directly within JavaScript or TypeScript often involves messy string concatenation, lacks type safety (leading to runtime errors), and doesn't integrate smoothly with JavaScript's syntax. BuckDB aims to solve these problems by providing a **fluent, type-safe, and JavaScript-friendly interface** for interacting with DuckDB databases. Instead of writing raw SQL, you build queries programmatically using familiar JavaScript patterns.

**How it Works: Building Queries Fluently**

BuckDB provides different entry points depending on your environment:

*   **Node.js:** Use `import { MemoryDB, from } from './buckdb';`
*   **Browser/WASM:** Use `import { MemoryDB, from } from './buckdb.wasm';`

Once imported, you use a chainable API starting with `from()` to construct your query:

```typescript
import { from } from './buckdb'; // Or './buckdb.wasm'

// Example: Find names of users older than 30, order by name
async function findUsers() {
  const users = await from('users.parquet') // Start query from 'users.parquet'
    .where(user => user.age > 30)         // Filter using JS arrow function (parsed to SQL WHERE)
    .select(user => ({ name: user.name })) // Select specific fields (parsed to SQL SELECT)
    .orderBy(['name', 'ASC'])             // Order results (parsed to SQL ORDER BY)
    .execute();                           // Execute the query and get results

  console.log(users);
  // Expected Output (example): [{ name: 'Alice' }, { name: 'Bob' }]
}

// Example: Calculate average age per city
async function averageAgeByCity() {
  const avgAges = await from('users.csv', 'u') // Use alias 'u' for the table
    .groupBy(u => u.city)                     // Group by city
    .select(u => ({                           // Select city and calculate average age
      city: u.city,
      average_age: 'AVG(u.age)' // Can mix JS access and raw SQL snippets
    }))
    .execute();

  console.log(avgAges);
  // Expected Output (example): [{ city: 'New York', average_age: 35.5 }, { city: 'London', average_age: 42.0 }]
}

// Example: Joining tables
async function getUserOrders() {
  const userOrders = await from('users', 'u')
    .join('orders', 'o', order => order.user_id === u.id) // Join users and orders
    .where(u => u.status === 'active')
    .select((u, o) => ({ // Access fields from both tables via function parameters
      userName: u.name,
      orderId: o.id,
      orderAmount: o.amount
    }))
    .limit(10)
    .execute();

  console.log(userOrders);
}

// Example: Using context variables
async function findUsersByMinAge(minAge: number) {
    const users = await from('users')
      .context({ minAge }) // Pass external variable into the query context
      .where(user => user.age > minAge) // Use the context variable
      .select(user => user.name)
      .execute();
    console.log(users);
}

findUsers();
averageAgeByCity();
getUserOrders();
findUsersByMinAge(25); // Find users older than 25
```

**Key Concepts Explained:**

1.  **Adapters (`buckdb.ts` / `buckdb.wasm.ts`):** These files handle the connection to DuckDB in different environments (Node.js vs. WASM). You import from the one relevant to your project, but the query-building API (`from(...)`, `.where(...)`, etc.) remains consistent. They abstract away the underlying DuckDB driver differences.
2.  **Fluent Builder (`src/build.ts`):** This is the core engine. The `from()` function initiates a query, and methods like `.where()`, `.select()`, `.join()`, `.groupBy()`, `.orderBy()`, `.limit()`, `.copyTo()` are chained together. Each method modifies an internal representation of the SQL query. `.execute()` finally translates this internal state into a SQL string and runs it via the adapter.
3.  **JavaScript-to-SQL Parser (`src/parser.ts`):** This is the magic that lets you write `user => user.age > 30`. The parser analyzes these JavaScript arrow functions and translates property access (`user.age`), comparisons (`>`), logical operators (`&&`, `||`), and even function calls within the arrow function into the equivalent SQL syntax. This makes writing conditions and projections feel natural for JavaScript developers. It also handles passing external variables using `.context()`.
4.  **Type System (`.buck/types.ts`):** Defines custom TypeScript types (like `DVarcharField`, `DNumericField`) that correspond to DuckDB's data types. This system aims to provide type checking during query construction, catching potential errors before runtime.
5.  **Interface Generator (`src/interface-generator.ts` - Node.js only):** In Node.js environments, this tool can automatically generate a `Models` interface based on your actual database schema (stored in `.buck/table.json`). This enhances type safety significantly, providing autocompletion and compile-time checks for table and column names within your queries.

**Overall Goal:**

BuckDB strives to make database interactions in JavaScript/TypeScript more productive and reliable. By offering a fluent, type-aware API that translates JavaScript expressions into SQL, it reduces boilerplate, improves code readability, and helps prevent common SQL errors, allowing developers to focus more on their application logic.
