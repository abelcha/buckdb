// declare module '@buckdb/*' {
//     const content: string
//     export default content
// }

declare module '*.json?raw' {
    const content: string
    export default content
}

declare module '*.html?raw' {
    const content: string
    export default content
}

declare interface ImportMeta {
    url: string
    main?: boolean
    glob: (path: string, options?: { as?: string; eager?: boolean }) => Record<string, () => Promise<any>>
}
