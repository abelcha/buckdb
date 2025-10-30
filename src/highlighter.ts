// DuckDB SQL Terminal Highlighter

// ANSI escape codes for colors
const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";

// Function to convert hex to ANSI 256 color or true color if supported
// For simplicity, we'll use basic ANSI colors or direct hex if the terminal supports it.
// Most modern terminals support true color (24-bit).
function hexToAnsi(hex: string, bold: boolean = false): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    let style = bold ? ANSI_BOLD : "";
    return `${style}\x1b[38;2;${r};${g};${b}m`;
}

interface StyleConfig {
    comment: string;
    keyword: string;
    function: string;
    literal: string;
    identifier: string; // Default/fallback color
    operator: string;
    punctuation: string;
}

// Default styles based on the image and CSS
// These will be overridden by parsed CSS if possible
let styles: StyleConfig = {
    comment: hexToAnsi("#636d83"),      // Light grey/blueish grey from .highlight .c
    keyword: hexToAnsi("#10b1fe", true), // Bright blue, bold from .highlight .k
    function: hexToAnsi("#3fc56b"),     // Green from .highlight .nf
    literal: hexToAnsi("#ff78f8"),      // Pink/Magenta from .highlight .m
    identifier: hexToAnsi("#D4D4D4"),   // Default light grey (common editor default)
    operator: hexToAnsi("#7a82da"),     // From .highlight .o (e.g. AS) - though AS is a keyword
    punctuation: hexToAnsi("#D4D4D4"), // Default for (), ,, ;
};

// SQL Tokenizer
enum TokenType {
    COMMENT,
    KEYWORD,
    FUNCTION,
    IDENTIFIER,
    LITERAL_NUMBER,
    LITERAL_STRING,
    OPERATOR,
    PUNCTUATION,
    WHITESPACE,
    UNKNOWN,
}

interface Token {
    type: TokenType;
    value: string;
}

const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'AS', 'DESC', 'ASC', 'JOIN',
    'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
    'DELETE', 'CREATE', 'TABLE', 'VIEW', 'INDEX', 'DROP', 'ALTER', 'ALL', 'DISTINCT',
    'UNION', 'INTERSECT', 'EXCEPT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AND', 'OR', 'NOT',
    'NULL', 'IS', 'TRUE', 'FALSE', 'EXISTS', 'IN', 'LIKE', 'BETWEEN', 'ANY', 'SOME', 'OVER',
    'PARTITION', 'ROWS', 'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW'
];

const SQL_FUNCTIONS = [ // Common SQL functions, DuckDB might have more
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ABS', 'ROUND', 'CAST', 'COALESCE', 'NULLIF',
    'SUBSTRING', 'TRIM', 'LOWER', 'UPPER', 'LENGTH', 'DATE', 'TIME', 'DATETIME', 'STRFTIME',
    'RANDOM', 'LAST_INSERT_ROWID'
    // Add more DuckDB specific functions if needed
];


function tokenizeSql(sql: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < sql.length) {
        let char = sql[i];
        let lookahead = sql.substring(i);

        // 1. Whitespace
        if (/\s/.test(char)) {
            let value = "";
            while (i < sql.length && /\s/.test(sql[i])) {
                value += sql[i];
                i++;
            }
            tokens.push({ type: TokenType.WHITESPACE, value });
            continue;
        }

        // 2. Comments
        if (lookahead.startsWith('--')) {
            let value = "";
            while (i < sql.length && sql[i] !== '\n') {
                value += sql[i];
                i++;
            }
            tokens.push({ type: TokenType.COMMENT, value });
            continue;
        }
        if (lookahead.startsWith('/*')) {
            let value = "/*";
            i += 2;
            while (i < sql.length && !sql.substring(i).startsWith('*/')) {
                value += sql[i];
                i++;
            }
            if (sql.substring(i).startsWith('*/')) {
                value += "*/";
                i += 2;
            }
            tokens.push({ type: TokenType.COMMENT, value });
            continue;
        }

        // 3. Strings
        if (char === "'" || char === '"') {
            let quote = char;
            let value = quote;
            i++;
            while (i < sql.length && sql[i] !== quote) {
                value += sql[i];
                if (sql[i] === '\\' && i + 1 < sql.length) { // Handle escaped quotes
                    value += sql[i + 1];
                    i++;
                }
                i++;
            }
            if (i < sql.length && sql[i] === quote) {
                value += quote;
                i++;
            }
            tokens.push({ type: TokenType.LITERAL_STRING, value });
            continue;
        }

        // 4. Numbers (simple integers and decimals)
        if (/\d/.test(char)) {
            let value = "";
            while (i < sql.length && (/\d/.test(sql[i]) || (sql[i] === '.' && /\d/.test(sql[i + 1])))) {
                value += sql[i];
                i++;
            }
            tokens.push({ type: TokenType.LITERAL_NUMBER, value });
            continue;
        }

        // 5. Punctuation: ( ) , ; . *
        if (/[()[\],;.*]/.test(char)) {
            tokens.push({ type: TokenType.PUNCTUATION, value: char });
            i++;
            continue;
        }

        // 6. Operators: = < > ! + - / % & | ^ ~
        // For SQL, common operators are =, <, >, <=, >=, <>, !=, AND, OR, NOT (keywords), LIKE (keyword)
        // The image doesn't show many operators distinctly colored other than 'AS' (keyword)
        // and '*' within count(*) which we treat as punctuation.
        // We can add more specific operator handling if needed.
        // For now, let's keep it simple.
        const operatorMatch = lookahead.match(/^([=<>!+\-/%&|^~]+)/);
        if (operatorMatch) {
            tokens.push({ type: TokenType.OPERATOR, value: operatorMatch[1] });
            i += operatorMatch[1].length;
            continue;
        }


        // 7. Identifiers, Keywords, Functions
        if (/[a-zA-Z_]/.test(char)) {
            let value = "";
            while (i < sql.length && /[a-zA-Z0-9_]/.test(sql[i])) {
                value += sql[i];
                i++;
            }
            const upperValue = value.toUpperCase();
            if (SQL_KEYWORDS.includes(upperValue)) {
                tokens.push({ type: TokenType.KEYWORD, value });
            } else if (i < sql.length && sql[i] === '(') {
                tokens.push({ type: TokenType.FUNCTION, value });
            } else {
                tokens.push({ type: TokenType.IDENTIFIER, value });
            }
            continue;
        }


        // Unknown
        tokens.push({ type: TokenType.UNKNOWN, value: char });
        i++;
    }
    return tokens;
}

function highlightSql(sql: string, currentStyles: StyleConfig = styles): string {
    const tokens = tokenizeSql(sql);
    return tokens.map(token => {
        switch (token.type) {
            case TokenType.COMMENT:
                return currentStyles.comment + token.value + ANSI_RESET;
            case TokenType.KEYWORD:
                return currentStyles.keyword + token.value + ANSI_RESET;
            case TokenType.FUNCTION:
                return currentStyles.function + token.value + ANSI_RESET;
            case TokenType.IDENTIFIER:
                return currentStyles.identifier + token.value + ANSI_RESET;
            case TokenType.LITERAL_NUMBER:
                return currentStyles.literal + token.value + ANSI_RESET;
            case TokenType.LITERAL_STRING:
                return styles.literal + token.value + ANSI_RESET; // Using literal color for strings too
            case TokenType.OPERATOR:
                // 'AS' is a keyword and handled by KEYWORD. Other operators like '=' might use this.
                // The image shows 'AS' in keyword color.
                return currentStyles.operator + token.value + ANSI_RESET;
            case TokenType.PUNCTUATION:
                // Parentheses, commas, semicolons, asterisk in count(*)
                // The image shows these in the default text color (like identifiers)
                // or sometimes a specific color (like '*' in count(*) is green in some themes)
                // For count(*), '*' is part of the function call, but tokenizer sees it as punctuation.
                // The image shows '*' in count(*) as green, same as 'count'.
                // This simple tokenizer won't handle that context perfectly.
                // We'll color it as punctuation, which defaults to identifier color.
                if (token.value === '*' && tokens[tokens.indexOf(token) - 1]?.type === TokenType.FUNCTION) {
                    // A bit of a hack to color '*' like a function if it follows one.
                    // This is not robust. A proper AST parser would be better.
                    // For the image, count(*) has count (green), ( (default), * (green), ) (default)
                    // This is tricky. Let's color '*' as function color for now if it's inside a function context.
                    // The provided CSS has .nf for functions (green).
                    // The image shows count(*) where count is green, and * is also green.
                    // Let's try to make '*' green if it's part of a function call.
                    // This is still a simplification.
                    return currentStyles.function + token.value + ANSI_RESET;
                }
                return currentStyles.punctuation + token.value + ANSI_RESET;
            case TokenType.WHITESPACE:
                return token.value;
            case TokenType.UNKNOWN:
            default:
                return currentStyles.identifier + token.value + ANSI_RESET; // Default to identifier color
        }
    }).join("");
}

async function main() {

    const exampleSql = `-- Get the top-3 busiest train stations
SELECT
    station_name,
    count(*) AS num_services
FROM train_services
GROUP BY ALL
ORDER BY num_services DESC
LIMIT 3;

-- Load CSV file to a table. DuckDB auto-detects
-- the CSV's format, column name and types
CREATE TABLE stations AS
    FROM 's3://duckdb-blobs/stations.csv';
`;

    console.log('=============')
    const highlightedSql = highlightSql(exampleSql);
    console.log(highlightedSql);

    const anotherSql = "SELECT column1, column2 FROM my_table WHERE id = 10 AND name = 'Test';";
    console.log('=============')
    console.log(highlightSql(anotherSql));
    console.log('=============')
}

// If running directly (e.g. with bun run duckdb-highlighter.ts)
if (import.meta.main) {
    main();
}

// Export for potential module usage
export { tokenizeSql, highlightSql, hexToAnsi, styles as currentStyles, TokenType, SQL_KEYWORDS, SQL_FUNCTIONS };
