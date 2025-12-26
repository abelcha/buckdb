#!/usr/bin/env bun
import { serve } from "bun";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: process.argv.slice(2),
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
  console.log(`Usage: buckdb [options]

Options:
  -p, --port <port>  Port to run the server on (default: 3000)
  -h, --help         Show this help message`);
  process.exit(0);
}

const port = parseInt((values.port as string) ?? "3000", 10);

serve({
  port,
  fetch() {
    return new Response("🦆 BuckDB Server", {
      headers: { "Content-Type": "text/plain" },
    });
  },
});

console.log(`🚀 BuckDB Server running at http://localhost:${port}/`);
