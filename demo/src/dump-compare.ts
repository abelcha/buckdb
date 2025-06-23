const terminalColWidth = parseFloat(await Bun.$`tput cols`.text())

const printClamped = (str, clampedLength) => str.length > clampedLength ? (str.substring(0, clampedLength - 1) + '…') : str.padEnd(clampedLength, ' ');

export function dumpSideBySide(...expressions: string[]): void {
  if (expressions.length < 2) {
    throw new Error('At least 2 expressions are required for side-by-side comparison');
  }

  const terminalWidth = process.stdout.columns || 80;
  
  // Calculate individual column widths based on content (with padding)
  const padding = 2; // 1 space on each side
  const columnWidths = expressions.map(expr => {
    const lines = expr.split('\n');
    return Math.max(...lines.map(line => line.length)) + padding;
  });
  
  // Calculate total needed width (content + separators + borders)
  const separatorWidth = 1; // '|'
  const borderWidth = 2; // '|' on each side
  const totalNeededWidth = columnWidths.reduce((sum, width) => sum + width, 0) + 
                          (expressions.length - 1) * separatorWidth + 
                          borderWidth;
  
  // Use the minimum of total needed width and terminal width
  const boxWidth = Math.min(totalNeededWidth, terminalWidth);
  
  // Recalculate column widths if we need to fit within terminal
  let finalColumnWidths: number[];
  if (totalNeededWidth > terminalWidth) {
    const availableWidth = terminalWidth - (expressions.length - 1) * separatorWidth - borderWidth;
    const totalContentWidth = columnWidths.reduce((sum, width) => sum + width, 0);
    finalColumnWidths = columnWidths.map(width => 
      Math.max(padding + 3, Math.floor((width / totalContentWidth) * availableWidth)) // Ensure minimum width
    );
  } else {
    finalColumnWidths = columnWidths;
  }

  // Split expressions into lines
  const expressionLines = expressions.map(expr => expr.split('\n'));
  const maxLines = Math.max(...expressionLines.map(lines => lines.length));

  // Create top border
  const topBorderParts = finalColumnWidths.map(width => '-'.repeat(width));
  console.log('+' + topBorderParts.join('+') + '+');

  // Print each line
  for (let i = 0; i < maxLines; i++) {
    const lineParts: string[] = [];
    
    for (let j = 0; j < expressions.length; j++) {
      const line = expressionLines[j][i] || '';
      const maxContentWidth = finalColumnWidths[j] - padding;
      const clampedLine = line.length > maxContentWidth 
        ? line.substring(0, maxContentWidth - 3) + '...'
        : line;
      const paddedLine = (' ' + clampedLine).padEnd(finalColumnWidths[j] - 1) + ' ';
      lineParts.push(paddedLine);
    }
    
    console.log('|' + lineParts.join('|') + '|');
  }

  // Create bottom border
  const bottomBorderParts = finalColumnWidths.map(width => '-'.repeat(width));
  console.log('+' + bottomBorderParts.join('+') + '+');
}

if (import.meta.main) {

    // Example with 2 parameters (original functionality)
    dumpSideBySide(`
Buck().from('duckdb_functions()')
    .select()
    .where(e =>
        e.function_name.Like('%str%') &&
        e.function_name.len().Between(3, 12) &&
        !e.description.IsNull()
    )
    `, `
FROM duckdb_functions()
    SELECT *
    WHERE
        (function_name LIKE '%str%' AND
        function_name.len() BETWEEN 3 AND 12 AND
        description IS NOT NULL)`);

    // Example with 3 parameters
    dumpSideBySide(
        `Buck().from('users')
    .select('name', 'age')
    .where(u => u.age > 18)`,

        `SELECT name, age
    FROM users
    WHERE age > 18`,

        `db.users.find(
        { age: { $gt: 18 } },
        { name: 1, age: 1 }
    )`
    );

    // Example with 4 parameters
    dumpSideBySide(
        `// JavaScript
const result = data
    .filter(x => x > 5)
    .map(x => x * 2)`,

        `-- SQL
SELECT value * 2
FROM data
WHERE value > 5`,

        `# Python
result = [
    x * 2 for x in data
    if x > 5
]`,

        `// Rust
let result: Vec<i32> = data
    .iter()
    .filter(|&&x| x > 5)
    .map(|&x| x * 2)
    .collect();`
    )
    /*
                                                    |                                                                                                              
    Buck().from('duckdb_functions()')               | FROM duckdb_functions()                                                                                      
        .select()                                   |     SELECT *                                                                                                 
        .where(e =>                                 |     WHERE                                                                                                    
            e.function_name.Like('%str%') &&        |         (function_name LIKE '%str%' AND                                                                      
            e.function_name.len().Between(3, 12) && |         function_name.len() BETWEEN 3 AND 12 AND                                                             
            !e.description.IsNull()                 |         description IS NOT NULL)                                                                             
        )                                           |                                                                                                              
                   
    */
}
