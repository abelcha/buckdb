const e=`import { extractReconciledCalls } from "./extractor";

let count = 0
Bun.serve({
  port: 3000,
  routes: {
    "/extractReconciledCalls": {
      POST: async req => {
        const { code } = await req.json();
        console.clear()
        console.log('---------------------------', count ++, '---------------------------');
        console.dir('xReceived code:', code);
        const resp = extractReconciledCalls(code)
        console.dir(...resp);
        // console.
        return Response.json(resp);
      },
    },
  },
  fetch: () => new Response("Not Found", { status: 404 }),
});
`;export{e as default};
