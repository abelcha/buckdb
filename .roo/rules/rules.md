# Roo Cline Code Rules

## Initialization
- At start, read `PROJECT_SUMMARY.md` if it exists.

## Code Style
- Write compact, reusable code with as few lines as possible.
- Avoid over-commenting; add comments only when necessary.
- Do not use `OutputChannel`; use a final `console.log` if needed.

## Testing
- Name test files as `[source].test.ts`.
- Run tests with:
  ```
  bun test [source].test.ts
  ```
- Example:
  ```ts
  // example.test.ts
  describe('myTest', () => {
    it('should test whatever', () => {
      expect(myFunc()).toBe('result');
    });
  });
  ```

## Development Workflow
- If necessary, verify browser opening at `http://localhost:5173/`.
- The server is always running.
- Use `bun` instead of `node` whenever possible.
- Use `bunx` instead of `npx`.

## Available MCP Servers
- github
- filesystem
- git (local repository actions)
- fetch (actions: `fetch_html`, `fetch_json`, `fetch_txt`, `fetch_markdown`)