const o=`import { Buck, from } from "@buckdb/isomorphic";
import { glob } from "@buckdb/tf";


// Buck('/mods/data/atuin/history.db')
// .from('')
// from('file:///mods/data/atuin/history.db').select(e => e).execute()
Buck('/mods/data/atuin/history.db')
    .from('History')
    .where(e => e.command.as('Varchar').match(/abel/))
// .select('')`;export{o as default};
