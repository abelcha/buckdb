# Project Overview

This is a web-based Integrated Development Environment (IDE) built using the Monaco Editor (the core of VS Code) via the `monaco-vscode-api`. Its primary purpose is to provide a specialized environment for writing, executing, and understanding queries for a data system called "Buck", using TypeScript as the query language.

## Core Features and Implementation Details

### 1. Web-Based VS Code Environment Setup

- **Description:** Provides the foundational VS Code-like editor experience in the browser, including core editor functionalities, file system abstraction, configuration, keybindings, and theme support.
- **Implementation:**
  - **[`src/setup.common.ts`](./src/setup.common.ts)**: Initializes essential services (`initUserConfiguration`, `initUserKeybindings`), sets up a virtual file system (`RegisteredFileSystemProvider`, `createIndexedDBProviders`, `registerFileSystemOverlay`), loads initial files (`loadFile`), configures the Monaco workbench (`constructOptions`), and sets up web workers (`MonacoEnvironment.getWorker`).
  - **[`src/imports.ts`](./src/imports.ts)**: Imports numerous `@codingame/monaco-vscode-*-default-extension` packages to load standard VS Code features (language support for JS/TS/JSON/CSS, themes, diff view, etc.) into the Monaco instance.
  - **[`src/main.views.ts`](./src/main.views.ts)**: Handles basic interactions on the host HTML page and ensures the main extension logic ([`src/main.v2.ts`](./src/main.v2.ts)) is loaded.

### 2. "Buck" Query Execution

- **Description:** Allows users to execute TypeScript code containing Buck queries directly from the editor. It supports running the entire active file or specific "cells" (logical blocks) within the file.
- **Implementation:**
  - **[`src/features/runTs.ts`](./src/features/runTs.ts) (`runActiveTypeScriptFile` function):** Contains the core execution logic. It gets the code from the active editor, potentially identifies a specific "cell" using `extractFromStatementsAST`, transpiles the TypeScript to JavaScript using `Sucrase` (`transform`), and executes the result using `new Function` or `eval`. Results and errors are potentially logged or stored in `window.globalData`/`window.globalError`.
  - **[`src/main.v2.ts`](./src/main.v2.ts)**: Registers the commands `run.activeTypeScriptFile` and `run.activeCell`, linking them to the `runActiveTypeScriptFile` function. It also creates and manages the `runOutputChannel` for displaying execution output.
  - **[`src/extract-from-statements.ts`](./src/extract-from-statements.ts) (`extractFromStatementsAST` function):** Used by `runTs.ts` to identify the boundaries of code "cells" based on the parsed `.from()` statements, enabling execution of specific blocks.

### 3. Live SQL Preview (Transformed View)

- **Description:** Provides a synchronized, side-by-side view that displays the generated SQL corresponding to the Buck queries written in the main TypeScript editor. This view updates automatically as the TypeScript code changes.
- **Implementation:**
  - **[`src/transform-text.ts`](./src/transform-text.ts) (`transformedProvider`, `transformCode` function):** Defines the content provider for the `transformed:` URI scheme. It parses the original TS code (`extractFromStatementsAST`), generates SQL for each query chain by executing a `.toSql()` method (found via `cleanFromChain`), and formats this SQL into the content for the preview pane.
  - **[`src/sync-view.ts`](./src/sync-view.ts) (`openTransformedViewAndSync`, `scrollSyncMap`):** Handles opening the preview pane (`showTextDocument` with `ViewColumn.Beside`) and setting up scroll synchronization between the original editor and the preview editor using Monaco's `onDidScrollChange` events.
  - **[`src/main.v2.ts`](./src/main.v2.ts)**: Registers the `transformedProvider`, registers the `show-transformed-view` command (which calls `openTransformedViewAndSync`), and sets up listeners (`onDidChangeActiveTextEditor`, `onDidChangeTextDocument`) to trigger updates or opening of the transformed view via `transformedProvider.update()` and `openTransformedViewAndSync`.

### 4. Schema Management and Type Generation

- **Description:** Automatically fetches, caches, and manages data schemas associated with the Buck queries. Based on these schemas, it generates TypeScript interface definitions (`.buck/table3.ts`) to provide type safety and intellisense.
- **Implementation:**
  - **[`src/transform-text.ts`](./src/transform-text.ts) (`Schemes` class, `schemes.upsert`, `schemes.merge`):** This class within the `transformedProvider` manages the schema logic. When processing a `.from()` statement (`upsert`), it checks if the schema is cached (`this.content`, loaded from `@external/.buck/table.json`). If not, it debounces a `merge` call which executes a `.fetchSchema()` method derived from the query's `chain` (`new Function`), updates the cache, saves it to `.buck/table.json` (using `writeFile` from `setup.common.ts` and the `/save-file` endpoint), calls `generateInterface` (from `@external/src/interface-generator`), and saves the result to `.buck/table3.ts`.
  - **[`src/setup.common.ts`](./src/setup.common.ts) (`writeFile` function):** Provides the utility used by `Schemes` to write the updated schema JSON and generated TS types to the virtual file system and trigger the backend save.

### 5. S3 Path Autocompletion

- **Description:** Provides autocompletion suggestions for S3 paths when typing inside `.from('s3://...')` string literals in the TypeScript editor.
- **Implementation:**
  - **[`src/completion-provider.ts`](./src/completion-provider.ts) (`s3CompletionProvider`):** Implements the `vscode.CompletionItemProvider` interface. The `provideCompletionItems` method checks if the cursor is inside an `s3://` path within a `.from()` call using regex. If so, it extracts the S3 prefix, potentially uses the Buck system (`BuckFromChain(st).from(glob(...)).execute()`) to list matching S3 objects (currently uses mock data as a placeholder), and returns `CompletionItem` suggestions.
  - **[`src/main.v2.ts`](./src/main.v2.ts)**: Registers the `s3CompletionProvider` with the VS Code language features API (`vscode.languages.registerCompletionItemProvider`).

### 6. File Saving

- **Description:** Persists changes made in the editor's virtual file system to a backend storage.
- **Implementation:**
  - **[`src/save-command.ts`](./src/save-command.ts)**: Exports a function that registers an `onDidSaveTextDocument` listener. When a document with the `file:` scheme is saved, it extracts the path and content and sends it via a `fetch` POST request to the `/save-file` endpoint.
  - **[`src/main.v2.ts`](./src/main.v2.ts)**: Imports and calls the function from `save-command.ts` to activate the save listener.
  - **[`src/setup.common.ts`](./src/setup.common.ts) (`writeFile` function):** Also used internally (e.g., by schema management) to save generated files (`.buck/table.json`, `.buck/table3.ts`) by writing to the virtual FS and calling the `/save-file` endpoint.
