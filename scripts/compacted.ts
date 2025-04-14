
const parser = await Bun.file('src/parser.ts').text()
const jsep = await Bun.file('src/jsep.ts').text()
const types = await Bun.file('.buck/types.ts').text()
const utils = await Bun.file('src/utils.ts').text()
const table2 = await Bun.file('.buck/table2.ts').text()
const buildv2 = await Bun.file('src/build-v2.ts').text()

const removeImports = (str: string) => {
    return str.split('\n').filter(e => !e.startsWith('import')).join('\n')
}
const namespaceify = (name, str: string) => {
    return `namespace ${name}  {
    ${str}
}
`
}

const _content = namespaceify('t', types) + '\n' + (jsep + '\n' + removeImports(parser) + '\n' + '\n' + removeImports(utils) + '\n' + removeImports(table2) + '\n' + removeImports(buildv2))



const content = _content
    .replaceAll(/export\sdefault/g, '')
    .replaceAll(/\n\s*export\s/g, '\n')
console.log(process.cwd() + '../monaco-react/playground/out.ts')
await Bun.write(process.cwd() + '/../monaco-react/playground/out.json', JSON.stringify({ content }))
await Bun.write(process.cwd() + '/../monaco-react/playground/out.ts', _content)

