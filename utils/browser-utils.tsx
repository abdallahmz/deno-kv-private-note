import { IS_BROWSER } from "$fresh/runtime.ts";


export const getIdentifier = (): string | null => {
    if ( !IS_BROWSER ) {
        return null;
    }
    const identifier = localStorage.getItem( "identifier" );

    if ( !identifier ) {
        return null;
    }
    return identifier
};

export const getEncryptedPassword = (): string | null => {
    if ( !IS_BROWSER ) {
        return null;
    }
    const encryptedPassword = localStorage.getItem( "encryptedPassword" );
    if ( !encryptedPassword ) {
        return null;
    }
    return encryptedPassword
};