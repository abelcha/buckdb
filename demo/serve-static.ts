import { serve } from "bun";
import { join } from "path";
import { parseArgs } from "util";

const DIST_DIR = join(import.meta.dir, "dist");

// Parse command line arguments
const { values } = parseArgs({
  args: Bun.argv,
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

// Show help if requested
if (values.help) {
  console.log(`Usage: bun run serve-static.ts [options]

Options:
  -p, --port <port>  Port to run the server on (default: 3000)
  -h, --help         Show this help message`);
  process.exit(0);
}

const port = parseFloat((values.port as string) ?? "3000");

serve({
  port,
  async fetch(req, server) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    let filePath = join(DIST_DIR, pathname === "/" ? "/index.html" : pathname);
    try {
      const file = Bun.file(filePath);
      if (!(await file.exists())) {
        return new Response("Not Found", { status: 404 });
      }
      const res = new Response(file);
      res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
      return res;
    } catch (e) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});
console.log(`Static server running at http://localhost:${port}/`);