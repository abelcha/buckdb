/// <reference types="vite/client" />

declare module '*.json?raw' {
    const content: string
    export default content
}

declare module '*.html?raw' {
    const content: string
    export default content
}


interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_REMOTE_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}