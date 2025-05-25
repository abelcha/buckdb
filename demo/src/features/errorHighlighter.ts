/**
 * Simple color highlighting for error messages.
 * Highlights:
 * - Quotes (single and double)
 * - Links (URLs)
 * - Uppercase SQL keywords
 * - Line numbers (e.g. LINE 2:)
 */

const KEYWORDS = [
  "SELECT", "AS", "FROM", "WHERE", "GROUP", "BY", "ORDER", "LIMIT", "OFFSET",
  "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "ON", "AND", "OR", "NOT", "IN",
  "IS", "NULL", "LIKE", "BETWEEN", "UNION", "ALL", "DISTINCT", "CASE", "WHEN",
  "THEN", "ELSE", "END", "INSERT", "UPDATE", "DELETE", "CREATE", "TABLE",
  "ALTER", "DROP", "INDEX", "VIEW", "FUNCTION", "RETURN", "ERROR", "LINE"
];

export function highlightErrorMessage(text: string): string {
  // Escape HTML special chars
  const escapeHtml = (str: string) =>
    str.replace(/&/g, "&")
       .replace(/</g, "<")
       .replace(/>/g, ">");

  // Regex for quotes (single or double)
  const quoteRegex = /(['"])(?:(?=(\\?))\2.)*?\1/g;

  // Regex for URLs (simple)
  const urlRegex = /https?:\/\/[^\s)]+/g;

  // Regex for line numbers like "LINE 2:"
  const lineNumberRegex = /\bLINE\s+\d+:/g;

  // Escape text first
  let escaped = escapeHtml(text);

  // Highlight URLs
  escaped = escaped.replace(urlRegex, (match) => {
    return `<span class="highlight gh">${match}</span>`;
  });

  // Highlight quotes
  escaped = escaped.replace(quoteRegex, (match) => {
    return `<span class="highlight s">${match}</span>`;
  });

  // Highlight line numbers
  escaped = escaped.replace(lineNumberRegex, (match) => {
    return `<span class="highlight ge">${match}</span>`;
  });

  // Highlight uppercase keywords
  // Use word boundary and case sensitive match
  const keywordPattern = "\\b(" + KEYWORDS.join("|") + ")\\b";
  const keywordRegex = new RegExp(keywordPattern, "g");

  escaped = escaped.replace(keywordRegex, (match) => {
    return `<span class="highlight k">${match}</span>`;
  });

  // Add line numbers at start of each line
  const lines = escaped.split("\n");
  const numberedLines = lines.map((line, idx) => {
    return `<span class="highlight gp">${idx + 1}</span>  ${line}`;
  });

  return numberedLines.join("\n");
}

// Example CSS classes to style:
// .highlight.gh { color: #636d83; font-family: monospace; font-style: italic; }
// .highlight.s { color: #f9c859; }
// .highlight.k { color: #10b1fe; font-weight: bold; font-family: monospace; }
// .highlight.ge { color: #ff6480; font-weight: bold; font-style: italic; font-family: monospace; }
// .highlight.gp { color: #7a82da; user-select: none; }