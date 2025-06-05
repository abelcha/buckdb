import * as ts from 'typescript';
import path from 'path';
import { compilerOptions as tsConfigCompilerOptions } from '../tsconfig.json';

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

    constructor() {
        // Load compiler options from tsconfig.json
        const { options: compilerOptions, errors } = ts.convertCompilerOptionsFromJson(
            tsConfigCompilerOptions,
            process.cwd()
        );
        if (errors && errors.length) {
            throw new Error(
                'Error parsing tsconfig.json: ' +
                errors.map(e => e.messageText).join(', ')
            );
        }

        const host: ts.LanguageServiceHost = {
            getScriptFileNames: () => Array.from(this.files.keys()),
            getScriptVersion: () => '1',
            getScriptSnapshot: (fileName) => {
                const content = this.files.get(fileName);
                return content != null ? ts.ScriptSnapshot.fromString(content) : undefined;
            },
            getCurrentDirectory: () => process.cwd(),
            getCompilationSettings: () => compilerOptions,
            getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
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
                return moduleNames.map(name => {
                    const result = ts.resolveModuleName(
                        name,
                        containingFile,
                        compilerOptions,
                        ts.sys
                    );
                    if (result.resolvedModule) {
                        const mod = result.resolvedModule;
                        const fileName = mod.resolvedFileName;
                        // Cache the module content so the language service can read types
                        if (!this.files.has(fileName)) {
                            const content = ts.sys.readFile(fileName);
                            if (content != null) {
                                this.files.set(fileName, content);
                            }
                        }
                        return mod;
                    }
                    // Fallback: unresolved module
                    return {
                        resolvedFileName: name,
                        isExternalLibraryImport: false
                    } as ts.ResolvedModule;
                });
            }
        };

        this.languageService = ts.createLanguageService(
            host,
            ts.createDocumentRegistry()
        );
    }

    addFile(fileName: string, content: string): void {
        const resolved = path.isAbsolute(fileName)
            ? fileName
            : path.resolve(process.cwd(), fileName);
        this.files.set(resolved, content);
    }

    getCompletionsAtPosition(
        fileName: string,
        position: number
    ): string[] {
        const resolved = path.isAbsolute(fileName)
            ? fileName
            : path.resolve(process.cwd(), fileName);
        const completions = this.languageService.getCompletionsAtPosition(
            resolved,
            position,
            {}
        );
        return completions?.entries.map(entry => entry.name) || [];
    }

    getSuggestions(code: string): string[] {
        // Place virtual.ts within src for correct relative module resolution
        const fileName = path.resolve(process.cwd(), 'src', 'virtual.ts');
        const position = code.length;
        this.addFile(fileName, code);
        return this.getCompletionsAtPosition(fileName, position);
    }
}