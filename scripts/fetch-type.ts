import { Buck, from, jsonModelTable } from "@buckdb/node";

// for every file in argv:
for (const file of Bun.argv.slice(2)) {
    // console.log({ file })
    if (file.endsWith('.db')) {
        const db = Buck(file)
        const resp = await db.fetchTables()
        for (const tname in resp) {
            console.log('saving', file, tname, resp[tname])
            jsonModelTable.writeSchema(file, tname, resp[tname])
        }
    } else {
        await from(file).ensureSchemas()
    }
}

// for (conf )

// from()