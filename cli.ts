#!/usr/bin/env bun
import { serve } from "bun";
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

// Default HTML page
const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BuckDB Server</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        h1 {
            font-size: 3em;
            margin: 0;
        }
        p {
            font-size: 1.2em;
            margin: 10px 0;
            opacity: 0.9;
        }
        .info {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <h1>🦆 BuckDB</h1>
    <p>Server is running...</p>
    <div class="info">
        <p><strong>Ready for WebSocket connections</strong></p>
    </div>
</body>
</html>`;

// Parse arguments
const args = process.argv.slice(2);
const { values } = parseArgs({
  args,
  options: {
    port: {
      type: "string",
      short: "p",
      default: "3000"
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
  console.log(`BuckDB Server

Usage: buckdb [options]

Options:
  -p, --port <port>    Port to run the server on (default: 3000)
  -h, --help          Show this help message

Example:
  buckdb -p 3000
`);
  process.exit(0);
}

const port = parseInt((values.port as string) ?? "3000", 10);

// Start server
serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);

    // Root path
    if (pathname === "/" || pathname === "") {
      const res = new Response(defaultHTML, {
        headers: {
          'Content-Type': 'text/html'
        }
      });
      return addSecurityHeaders(res);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`
🚀 BuckDB Server started
📍 URL: http://localhost:${port}/
`);
