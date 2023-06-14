const kv = await Deno.openKv();

export async function getEncryptedNote ( identifier: string ): Promise<string> {
    const result = await kv.get( [ 'notes', identifier ] );
    return result?.value?.data || '';
}

export async function postEncryptedNote ( identifier: string, encryptedNote: string ): Promise<void> {
    if ( encryptedNote.length > 65000 ) {
        throw new Error( 'Encrypted note too long' );
    }
    // TODO: Should verify that the note we are setting has correct signature (the identifier should be a public key)
    await kv.set( [ "notes", identifier ], { data: encryptedNote } );
    return;
}