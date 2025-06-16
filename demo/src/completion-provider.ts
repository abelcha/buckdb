
import * as vscode from 'vscode'

// Basic regex to find .from('s3://... or .from('file://... or .from('/...
const S3_PREFIX_REGEX = /s3:\/\/([^/'"]+)\/([^'"]*)$/
const FILE_PREFIX_REGEX = /file:\/\/?([^'"]*)$/
const PATH_PREFIX_REGEX = /\/([^'"]*)$/

const getFileCompletions = async (prefix: string): Promise<string[]> => {
    // @ts-ignore
    return window.from(`glob('${prefix}*')`).select(e => e.file).exec()
}

function createCompletionItems(
    results: string[],
    currentPath: string,
    position: vscode.Position,
    extractPath: (fullPath: string) => string | null,
    getFullPath: (fullPath: string) => string
): vscode.CompletionItem[] {
    return results.map((fullResultPath: string) => {
        const extractedPath = extractPath(fullResultPath)
        if (!extractedPath) return null

        if (!extractedPath.startsWith(currentPath)) {
            console.warn(`pathCompletionProvider: Result path "${extractedPath}" doesn't start with current path "${currentPath}". Skipping.`)
            return null
        }

        let remainingPath = extractedPath.substring(currentPath.length)

        const nextSlash = remainingPath.indexOf('/')
        let suggestionPart: string
        if (nextSlash === -1) {
            suggestionPart = remainingPath
        } else {
            suggestionPart = remainingPath.substring(0, nextSlash + 1)
        }

        if (!suggestionPart) return null

        const isFolder = suggestionPart.endsWith('/')
        const label = isFolder ? suggestionPart.slice(0, -1) : suggestionPart

        if (!label) return null

        const item = new vscode.CompletionItem(
            label,
            isFolder ? vscode.CompletionItemKind.Folder : vscode.CompletionItemKind.File,
        )
        item.insertText = suggestionPart
        item.detail = getFullPath(fullResultPath)
        item.range = new vscode.Range(position, position)

        if (isFolder) {
            item.commitCharacters = ['/']
            item.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger suggestions' }
        }
        return item
    }).filter((item): item is vscode.CompletionItem => item !== null)
        .filter((item, index, self) => index === self.findIndex((t) => t.insertText === item.insertText))
}

async function handleS3Completion(s3Match: RegExpMatchArray, position: vscode.Position): Promise<vscode.CompletionItem[] | undefined> {
    const fullPrefix = `s3://${s3Match[1]}/${s3Match[2]}`
    const bucket = s3Match[1]
    const currentPath = s3Match[2]

    console.log(`pathCompletionProvider: Detected S3 prefix: ${fullPrefix}, Bucket: ${bucket}, Path: ${currentPath}`)

    try {
        const s3ApiUrl = `https://${bucket}.s3.eu-west-3.amazonaws.com/?list-type=2&prefix=${encodeURIComponent(currentPath)}&delimiter=/`
        console.log(`pathCompletionProvider: Requesting URL: ${s3ApiUrl}`)

        const response = await fetch(s3ApiUrl, { method: 'GET' })

        if (!response.ok) {
            let errorDetail = `${response.status} ${response.statusText}`
            try {
                const errorXmlText = await response.text()
                const parser = new DOMParser()
                const errorDoc = parser.parseFromString(errorXmlText, 'application/xml')
                const code = errorDoc.querySelector('Code')?.textContent
                const message = errorDoc.querySelector('Message')?.textContent
                if (code || message) {
                    errorDetail = `${code || 'Error'}: ${message || 'Failed to fetch'}`
                }
            } catch (parseError) {
                // Ignore if parsing error response fails
            }
            throw new Error(`Failed to list S3 objects: ${errorDetail}`)
        }

        const xmlText = await response.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml')

        const results: string[] = []

        // Extract common prefixes (folders)
        xmlDoc.querySelectorAll('CommonPrefixes > Prefix').forEach(prefixNode => {
            const prefix = prefixNode.textContent
            if (prefix) {
                results.push(`s3://${bucket}/${prefix}`)
            }
        })

        // Extract object keys (files)
        xmlDoc.querySelectorAll('Contents > Key').forEach(keyNode => {
            const key = keyNode.textContent
            if (key && key !== currentPath) {
                results.push(`s3://${bucket}/${key}`)
            }
        })

        console.log(`pathCompletionProvider: Parsed ${results.length} results from S3 XML response.`)

        const completions = createCompletionItems(
            results,
            currentPath,
            position,
            (fullPath) => {
                const s3PathMatch = fullPath.match(/^s3:\/\/([^/]+)\/(.*)$/)
                return s3PathMatch ? s3PathMatch[2] : null
            },
            (fullPath) => fullPath
        )

        console.log(`pathCompletionProvider: Providing ${completions.length} unique completions for ${fullPrefix}`)
        return completions
    } catch (error) {
        console.error('Error fetching S3 completions via S3 REST API:', error)
        return undefined
    }
}

async function handlePathCompletion(pathMatch: RegExpMatchArray, position: vscode.Position, scheme: 'file' | 'path'): Promise<vscode.CompletionItem[] | undefined> {
    const currentPath = pathMatch[1]
    const fullPrefix = scheme === 'file' ? `file://${currentPath}` : currentPath

    console.log(`pathCompletionProvider: Detected ${scheme} prefix: ${fullPrefix}`)

    try {
        const files = await getFileCompletions(currentPath)
        console.log(`pathCompletionProvider: Found ${files.length} file completions`)

        const completions = createCompletionItems(
            files,
            currentPath,
            position,
            (fullPath) => {
                // Remove the file:// prefix if present
                return fullPath.replace(/^file:\/\//, '')
            },
            (fullPath) => {
                const cleanPath = fullPath.replace(/^file:\/\//, '')
                return scheme === 'file' ? `file://${cleanPath}` : cleanPath
            }
        )

        console.log(`pathCompletionProvider: Providing ${completions.length} unique ${scheme} completions for ${fullPrefix}`)
        return completions
    } catch (error) {
        console.error(`Error fetching ${scheme} completions:`, error)
        return undefined
    }
}

export const pathCompletionProvider: vscode.CompletionItemProvider = {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext,
    ): Promise<vscode.CompletionItem[] | vscode.CompletionList | undefined> {
        const linePrefix = document.lineAt(position).text.substring(0, position.character)

        // Check if we are inside paths within .from()
        const s3Match = linePrefix.match(S3_PREFIX_REGEX)
        const fileMatch = linePrefix.match(FILE_PREFIX_REGEX)
        const pathMatch = linePrefix.match(PATH_PREFIX_REGEX)

        if (s3Match) {
            return handleS3Completion(s3Match, position)
        } else if (fileMatch) {
            return handlePathCompletion(fileMatch, position, 'file')
        } else if (pathMatch) {
            return handlePathCompletion(pathMatch, position, 'path')
        }

        return undefined
    }
}

