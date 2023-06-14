import { useEffect, useState } from "preact/hooks";
import { getEncryptedPassword, getIdentifier } from "../utils/browser-utils.tsx";
import { Loader } from "../components/Loader.tsx";
import { decryptUtils, encryptUtils } from "../utils/crypto-utils.js";

export default function NoteInput () {
  const [ note, setNote ] = useState( '' );
  const [ synced, setSynced ] = useState( false );
  const [ loading, setLoading ] = useState( true );
  const [ identifier, setIdentifier ] = useState( '' );
  const [ encryptedPassword, setEncryptedPassword ] = useState( '' );

  useEffect( () => {
    const encryptedPassword = getEncryptedPassword() || '';
    setEncryptedPassword( encryptedPassword )
    const identifier = getIdentifier() || '';
    setIdentifier( identifier )
    setTimeout( () => loadJournal( identifier, encryptedPassword ), 300 );
  }, [] );

  const logOut = () => {
    localStorage.removeItem( "encryptedPassword" );
    localStorage.removeItem( "identifier" );
    location.reload();
  }

  const encryptNote = async (note: string, encryptedPassword: string) => {
    return await encryptUtils( note, encryptedPassword );
    
  };
  
  const decryptNote = async ( encryptedNote: string, encryptedPassword: string ) => {
    return await decryptUtils(encryptedNote, encryptedPassword);
  };
  
  const saveJournal = async () => {
    if ( !encryptedPassword ) {
      throw new Error( 'Cannot save journal without private key' );
    }
    // Encrypt the journal input using the password-derived key
    const encryptedData = await encryptNote( note, encryptedPassword );
    
    const response = await fetch('/api/note/' + identifier, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encryptedData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit note data');
    }

    // Clear the journal input
    setSynced( true );
  };

  const loadJournal = async (identifier: string, encryptedPassword: string) => {
    // Retrieve the encrypted data from the server
    // ... (Implement your server-side code to retrieve the encrypted data)
    if ( !identifier ) {
      console.debug( 'Cannot fetch journal without public key' );
      return;
    }

    const response = await fetch( `/api/note/${ identifier }` );
    
    let data = { encryptedData: '' };

    if (!response.ok) {
      console.debug( 'No existing note found' );
    } else {
      data = await response.json();
    }

    if ( !encryptedPassword ) {
      console.debug( 'Cannot decrypt journal without private key' );
      return;
    }
  
    // Decrypt the retrieved data using the password-derived key
    const decryptedData = await decryptNote( data.encryptedData, encryptedPassword );
    
    setNote( decryptedData );
    setLoading( false );
    setSynced( true );
  };

  const copyIdentifier = () => {
    navigator.clipboard.writeText(identifier)
  }
  
    const onInput = ( e: any ) => {
      setNote( e.target.value )
      setSynced( false );
    }
  const onSubmit = ( e: any ) => {
    saveJournal();
        e.preventDefault();
  }
  if ( !identifier || !encryptedPassword ) {
    return ( <></> );
  }
  if ( loading ) {
    return (
      <Loader></Loader>
    )
  }
  return (
    <div class="flex flex-col gap-4 w-full">
      <button
        onClick={logOut}
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Log out
      </button>
      <p class="text-lg">
        <span class="mr-2">
          {synced ? <span class="text-green-500">Synced ✔️</span> : <span class="text-red-500">Not synced ⚠️</span>}
        </span>
      </p>

      <form onSubmit={onSubmit}>
        <label for="note" class="block mb-2 text-sm font-medium text-gray-800">Your Secret Note ({ note.length }/20000 chars)</label>
        <div class="flex flex-column">
          <textarea
            rows={10}
            maxLength={20000}
            type="text"
            onInput={onInput}
            id="note" 
            class="bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 border border-gray-300 focus:outline-none"
            required
          >{note}</textarea>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
            type="submit"
          >
            Sync
          </button>
        </div>
      </form>

      <div class="m-3">
        <p class="text-gray-800 mr-2">My Public Identifier (used only to check "where" you're logged in)</p>
        <div class="flex-row items-center">
          <input
            type="text"
            value={identifier}
            class="bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block max-w p-3"
            readonly
          />
          <button
            class="text-gray-500 hover:text-gray-700 ml-2"
            onClick={copyIdentifier}
            aria-label="Copy Public Key"
          >
            Copy to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
