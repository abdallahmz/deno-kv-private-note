import { Handlers } from "$fresh/server.ts";
import { getEncryptedNote, postEncryptedNote } from "../../../utils/db.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
      const encryptedNote = await getEncryptedNote(ctx.params.id);
    
      const body = { encryptedData: encryptedNote };
      return new Response(JSON.stringify(body));
    },
    async POST(req, ctx) {
      const { encryptedData } = await req.json();
        
      postEncryptedNote(ctx.params.id, encryptedData);
      return new Response("Note created successfully", { status: 201 });
    },
  };
