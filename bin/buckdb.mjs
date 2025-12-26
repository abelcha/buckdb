#!/usr/bin/env node
import('./buckdb.js').catch(err => {
  console.error("Failed to run buckdb:", err);
  process.exit(1);
});
