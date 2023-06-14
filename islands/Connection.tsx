import { useEffect, useState } from "preact/hooks";
import { getIdentifier,getEncryptedPassword } from "../utils/browser-utils.tsx";
import { IS_BROWSER } from '$fresh/runtime.ts';
import { Loader } from "../components/Loader.tsx";

interface CounterProps {
  start: number;
}

async function createEncryptedPassword ( password: string ) {
  const msgUint8 = new TextEncoder().encode(password); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

async function createIdentifier ( encryptedPassword: string ) {
  const msgUint8 = new TextEncoder().encode(encryptedPassword); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

export default function Connection () {
  const [ text, setText ] = useState( '' );
  const [ identifier, setIdentifier ] = useState( '' );
  const [ encryptedPassword, setEncryptedPassword ] = useState( '' );
  const [ saving, setSaving ] = useState( false );
  const [ loading, setLoading ] = useState( true );
  const [ showPassword, setShowPassword ] = useState( false );

  useEffect( () => {
    if ( !IS_BROWSER ) {
      return;
    }
    setEncryptedPassword(getEncryptedPassword() || '')
    setIdentifier( getIdentifier() || '' )
    setLoading( false );
  }, [] );

  const togglePasswordVisibility = () => {
    setShowPassword( !showPassword );
  }

  const onInput = ( e: any ) => {
      setText(e.target.value)
  }

  const onSubmit = ( e: any )=> {
    saveKeys( 'napp-prefix-' + text );
    setSaving( true );
    setTimeout(() => location.reload(), 300 );
    e.preventDefault();
  }

  const saveKeys = async ( password: string ): Promise<void> => {
    const encryptedPassword = await createEncryptedPassword( password );
    localStorage.setItem( "encryptedPassword", encryptedPassword );
    const identifier = await createIdentifier( encryptedPassword );
    localStorage.setItem( "identifier", identifier );
  };

  if ( identifier && encryptedPassword ) {
    return (<></>)
  }
  if ( saving ) {
    return (<Loader></Loader>)
  }

  if ( loading ) {
    return ( <Loader></Loader> );
  }
return (
  <div class="flex flex-col gap-2 w-full my-3">
<form>
  <label for="password" class="block mb-2 text-lg font-semibold text-gray-900">Enter your password to access your note:</label>
    <div class="flex flex-row">
      <input
        type="password"
        maxLength={100}
        onInput={onInput}
        id="password" 
        class="bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 border border-gray-300 focus:outline-none"
        required
      />
      <div class="relative">
        <input
          type="text"
          onInput={onInput}
          id="passwordVisible"
          class="bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 border border-gray-300 focus:outline-none absolute top-0 left-0 opacity-0 pointer-events-none"
        />
        <span
          type=""
          onClick={togglePasswordVisibility}
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Toggle Password Visibility"
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      <button
        onClick={onSubmit}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
  </div>
);
}