
import nodefs, { existsSync, readFileSync } from 'node:fs';
import * as ts from 'typescript';
import path from 'path';
import { compilerOptions as tsConfigCompilerOptions } from '../tsconfig.json';
import * as nodePath from 'path';


const PATH_REGEXP = new RegExp('\\' + nodePath.win32.sep, 'g');
const ensureUnixPathCache = new Map<string, string>();
const IS_WINDOWS = process.platform === 'win32';

export const ensureUnixPath = IS_WINDOWS
    ? (path?: string): string | null => {
        if (!path) {
            return null;
        }

        const cachePath = ensureUnixPathCache.get(path);
        if (cachePath) {
            return cachePath;
        }

        // we use a regex instead of the character literal due to a bug in some versions of node.js
        // the path separator needs to be preceded by an escape character
        const normalizedPath = path.replace(PATH_REGEXP, nodePath.posix.sep);
        ensureUnixPathCache.set(path, normalizedPath);

        return normalizedPath;
    }
    : (path?: string) => path;

export interface CompletionTest {
    code: string;
    position: number;
    expectedCompletions: string[];
    excludedCompletions?: string[];
    description: string;
}

export class TSCompleter {
    private languageService: ts.LanguageService;
    private files: Map<string, string> = new Map();
    private imports: string[] = []
    constructor() {
        const compilerOptions = {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            resolution: ts.ModuleResolutionKind.NodeJs,
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            lib: ["esnext", "dom", "es5"]
        };

        // Load all necessary lib files
        const libFileNames = [
            "lib.es2015.d.ts",
            "lib.es2015.promise.d.ts",
            "lib.dom.d.ts",
            "lib.esnext.d.ts",
            "lib.es5.d.ts"
        ];

        libFileNames.forEach(libFileName => {
            const libPath = path.join(path.dirname(ts.sys.getExecutingFilePath()), libFileName);
            try {
                const content = readFileSync(libPath, 'utf-8');
                this.files.set(libPath, content);
            } catch (e) {
                // Skip if lib file not found
            }
        });

        // Configure TypeScript language service host
        const host: ts.LanguageServiceHost = {
            getScriptFileNames: () => Array.from(this.files.keys()),
            getScriptVersion: () => '1',
            getScriptSnapshot: (fileName) => {
                const content = this.files.get(fileName);
                return content != null ? ts.ScriptSnapshot.fromString(content) : undefined;
            },
            getCurrentDirectory: () => process.cwd(),
            getCompilationSettings: () => compilerOptions,
            getDefaultLibFileName: ts.getDefaultLibFilePath,
            fileExists: filePath => {
                if (this.files.has(filePath)) return true;
                return ts.sys.fileExists(filePath);
            },
            readFile: filePath => {
                const inMemory = this.files.get(filePath);
                if (inMemory != null) return inMemory;
                return ts.sys.readFile(filePath);
            },
            readDirectory: ts.sys.readDirectory,
            directoryExists: ts.sys.directoryExists,
            getDirectories: ts.sys.getDirectories,
            resolveModuleNames: (moduleNames: string[], containingFile: string) => {
                return moduleNames.map(moduleName => {
                    const { resolvedModule } = ts.resolveModuleName(
                        moduleName,
                        containingFile,
                        compilerOptions,
                        ts.sys,
                        undefined,
                    );
                    return resolvedModule;
                });
            },
        };

        this.languageService = ts.createLanguageService(
            host,
            ts.createDocumentRegistry(),
        );
        const diag = this.languageService.getCompilerOptionsDiagnostics()
        // console.log(diag.map(e => e.messageText.messageText).join('\n'))
        const resp = new Bun.Glob('**/*.{ts,js,tsx}').scanSync({ cwd: process.cwd(), dot: true })
        for (const file of resp) {
            if (file.match(/node_modules|trash/)) continue;
            this.addFile(file, ts.sys.readFile(file));
        }
    }

    addFile(fileName: string, content: string): void {
        const resolved = path.isAbsolute(fileName)
            ? fileName
            : path.resolve(process.cwd(), fileName);
        this.files.set(resolved, content);
    }

    addImport(names: string | string[], filePath: string): void {
        if (Array.isArray(names))
            names = '{' + names.join(', ') + '}'
        this.imports.push(`import ${names} from '${filePath}';`);
    }

    getCompletionsAtPosition(fileName: string, position: number): string[] {
        const resolved = path.isAbsolute(fileName)
            ? fileName
            : path.resolve(process.cwd(), fileName);
        const completions = this.languageService.getCompletionsAtPosition(
            resolved,
            position,
            {
                includeInlayEnumMemberValueHints: true,
                includeCompletionsForModuleExports: true,
                includeCompletionsWithInsertText: true
            }
        );
        return completions?.entries.map(entry => entry.name) || [];
    }

    getSuggestions(code: string | Function, offset = 0): string[] {
        if (typeof code === 'function')
            code = code.toString();
        const m = code.match(/['"`][\)\]]+$/)
        if (!offset && m)
            offset = m[0].length
        console.log(code, offset)
        const content = this.imports.join('; ') + code;
        const fileName = path.resolve(process.cwd(), 'src', 'virtual' + Math.random() + '.ts');
        const position = content.length - offset;
        this.addFile(fileName, content);
        const errors = [
            // ...this.languageService.getSyntacticDiagnostics(fileName),
            // ...this.languageService.getSuggestionDiagnostics(fileName),
            ...this.languageService.getSemanticDiagnostics(fileName)
        ]
        if (errors.length) {
            console.log('Type checking errors:', errors.map(e => (e.messageText as any)?.messageText).join('\n'));
        }
        return this.getCompletionsAtPosition(fileName, position).toSorted()
    }
}