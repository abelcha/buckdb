#!/usr/bin/env node
import("../cli.ts").catch(err => {
  console.error("Failed to run buckdb:", err);
  process.exit(1);
});
