import { serve, file, Glob, argv } from "bun";
import { join, relative } from "path";
import { parseArgs } from "util";
import { DuckDBInstance } from '@duckdb/node-api';


// Environment setup for DuckDB
process.env.DUCKDB_HTTPSERVER_FOREGROUND = '1';

export async function getAssets(distDir: string) {
  const scanner = new Glob("**/*");
  const assets: Record<string, string> = {};

  for (const relativePath of scanner.scanSync(distDir)) {
    const filePath = join(distDir, relativePath);
    const f = file(filePath);
    assets["/" + relativePath] = Buffer.from(await f.arrayBuffer()).toString("base64");
  }

  return assets;
}

// Inlined assets from build time (Base64)
const assetsBase64 = await getAssets(join(import.meta.dir, "demo/dist"));
const assets = Object.fromEntries(
  Object.entries(assetsBase64).map(([k, v]) => [k, Buffer.from(v as string, "base64")])
);

// Parse command line arguments
const { values } = parseArgs({
  args: argv,
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
  console.log(`Usage: bun run serve-static.ts [options]

Options:
  -p, --port <port>  Port to run the server on (default: 3000)
  -h, --help         Show this help message`);
  process.exit(0);
}

const port = parseInt((values.port as string) ?? "3000", 10);

// Initialize DuckDB
const instance = await DuckDBInstance.create(':memory:');
const connection = await instance.connect();

const initSql = `
INSTALL hostfs FROM community; 
LOAD hostfs;
INSTALL httpserver FROM community;
LOAD httpserver; 
SELECT httpserve_start('0.0.0.0', 9998, '');
`;

console.log('[DuckDB] Initializing...');
await connection.run(initSql);
console.log('[DuckDB] HTTP server started on port 9998');

const getMimeType = (filePath: string): string => {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const mimeTypes: Record<string, string> = {
    'html': 'text/html',
    'js': 'application/javascript',
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

// Build routes from inlined assets
const routes: Record<string, any> = {};
for (const [routePath, content] of Object.entries(assets)) {
  // @ts-ignore
  routes[routePath] = () => {
    const res = new Response(content, {
      headers: {
        'Content-Type': getMimeType(routePath)
      }
    });
    return addSecurityHeaders(res);
  };
  if (routePath === "/index.html") {
    // @ts-ignore
    routes["/"] = () => {
      const res = new Response(content, {
        headers: {
          'Content-Type': 'text/html'
        }
      });
      return addSecurityHeaders(res);
    };
  }
}

serve({
  port,
  routes,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);

    // DuckDB Proxy (Fallback for routes)
    if (pathname.startsWith('/duckdb')) {
      const targetUrl = new URL(req.url);
      targetUrl.protocol = 'http:';
      targetUrl.host = 'localhost:9998';
      targetUrl.pathname = pathname.replace(/^\/duckdb/, '');
      if (targetUrl.pathname === '') targetUrl.pathname = '/';

      console.log(`[Proxy] ${req.method} ${pathname} -> ${targetUrl.toString()}`);

      return fetch(new Request(targetUrl.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body,
        // @ts-ignore
        duplex: 'half'
      }));
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`\n🚀 Inlined server running at http://localhost:${port}/`);
console.log(`� Embedded assets: ${Object.keys(assets).length} files`);