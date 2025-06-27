// import { Buck, from } from "@buckdb/isomorphic";
// import { Buck, from } from "../wasm";
// https://renenyffenegger.ch/notes/development/databases/DuckDB/index
import { glob } from "../tf";


// Buck('/mods/data/atuin/history.db')
// .from('')
// from('file:///mods/data/atuin/history.db').select(e => e).execute()
Buck('s3://a1738/akira09.db')
    .from('Address')
    // .where(e => e.command.as('Varchar').match(/abel/))
// .select('')