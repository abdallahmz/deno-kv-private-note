import { Head } from "$fresh/runtime.ts";
import HowItWorks from "../components/HowItWorks.tsx";
import Connection from "../islands/Connection.tsx";
import NoteInput from "../islands/NoteInput.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Private Note App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to the Private Note App</h1>
        <h2 class="text-xl font-semibold text-center text-gray-600 mb-4">A Zero-knowledge Note Service</h2>
        <div>
          <Connection/>
          <NoteInput />
        </div>
        <HowItWorks/>
      </div>
    </>
  );
}
