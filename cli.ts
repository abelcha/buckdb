#!/usr/bin/env bun
import { serve, file, Glob } from "bun";
import { join, relative, resolve } from "path";
import { parseArgs } from "util";

const getMimeType = (filePath: string): string => {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const mimeTypes: Record<string, string> = {
    'html': 'text/html',
    'ts': 'application/typescript',
    'tsx': 'application/typescript',
    'js': 'application/javascript',
    'jsx': 'application/javascript',
    'json': 'application/json',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'ico': 'image/x-icon',
    'wasm': 'application/wasm',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

const addSecurityHeaders = (res: Response) => {
  res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return res;
};

// Create a simple HTML index for browsing files
function createIndexHtml(files: string[]): string {
  const fileList = files
    .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
    .map(f => `<li><a href="/?file=${encodeURIComponent(f)}">${f}</a></li>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BuckDB - TypeScript Runner</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
        }
        a {
            color: #0066cc;
            text-decoration: none;
            font-family: monospace;
        }
        a:hover {
            text-decoration: underline;
        }
        .info {
            background: #e8f4f8;
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>🦆 BuckDB TypeScript Runner</h1>
    <div class="container">
        <div class="info">
            <strong>Available TypeScript files:</strong>
        </div>
        <ul>
            ${fileList || '<li><em>No TypeScript files found in current directory</em></li>'}
        </ul>
    </div>
</body>
</html>`;
}

// Main CLI logic
const args = process.argv.slice(2);
const { values } = parseArgs({
  args,
  options: {
    port: {
      type: "string",
      short: "p",
      default: "3000"
    },
    dir: {
      type: "string",
      short: "d",
      default: "."
    },
    help: {
      type: "boolean",
      short: "h",
      default: false
    }
  },
  strict: false,
  allowPositionals: true
});

if (values.help) {
  console.log(`BuckDB - TypeScript File Server

Usage: buckdb [options]

Options:
  -p, --port <port>    Port to run the server on (default: 3000)
  -d, --dir <dir>      Directory to serve files from (default: current directory)
  -h, --help          Show this help message

Example:
  buckdb -p 3000 -d ./src
`);
  process.exit(0);
}

const port = parseInt((values.port as string) ?? "3000", 10);
const baseDir = resolve((values.dir as string) ?? ".");

// Scan for TypeScript files
async function scanFiles(): Promise<string[]> {
  try {
    const scanner = new Glob("**/*.ts", "**/*.tsx");
    const files: string[] = [];
    for (const filePath of scanner.scanSync(baseDir)) {
      files.push(filePath);
    }
    return files;
  } catch (error) {
    return [];
  }
}

// Start server
const fileList = await scanFiles();

serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);

    // Root path - serve index
    if (pathname === "/" || pathname === "") {
      const html = createIndexHtml(fileList);
      const res = new Response(html, {
        headers: {
          'Content-Type': 'text/html'
        }
      });
      return addSecurityHeaders(res);
    }

    // File serving
    if (pathname.startsWith("/")) {
      const filePath = join(baseDir, pathname.slice(1));

      // Security: prevent directory traversal
      const normalized = resolve(filePath);
      if (!normalized.startsWith(baseDir)) {
        return new Response("Forbidden", { status: 403 });
      }

      try {
        const f = file(normalized);
        const content = await f.arrayBuffer();

        const res = new Response(content, {
          headers: {
            'Content-Type': getMimeType(normalized)
          }
        });
        return addSecurityHeaders(res);
      } catch (error) {
        return new Response("Not Found", { status: 404 });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`
🚀 BuckDB Server started
📍 URL:  http://localhost:${port}/
📂 Dir:  ${baseDir}
📄 Files: ${fileList.length} TypeScript files found
`);
