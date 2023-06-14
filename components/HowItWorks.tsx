export default function HowItWorks () {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">How It Works</h2>

      <p class="my-2">Zero-knowledge means no one can access your messages without your password, even if someone else steals data from the database.</p>

      <p class="mb-2">
        <strong>This application is provided as is without any guarantee. There are still improvements to be done to ensure the actual security of the data.</strong>
    </p>
    <p>This application ensures the privacy of your notes using the following mechanisms:</p>
      <ol class="list-decimal list-inside mb-4">
        <li>
          <strong>Private Key Storage:</strong> Your private key is generated from the password you provide and is stored locally in your browser. It is never sent to the server, ensuring that only you have access to it.
        </li>
        <li>
          <strong>Password Protection:</strong> Your notes are encrypted using the private key derived from your password. This means that only someone who knows your password can decrypt and access your notes.
        </li>
        <li>
          <strong>Secure Database:</strong> Even if the database were to be leaked or compromised, the encrypted notes stored in the database would be of no use without the private key derived from your password. This adds an additional layer of security to protect your notes.
        </li>
      </ol>
      <p>
        By combining these security measures, we ensure that your notes remain private and inaccessible to anyone without your password, providing you with peace of mind and confidentiality.
    </p>
    <p class="mt-4">
        <strong>Important missing feature:</strong> We do not verify that the encrypted data comes from the correct key. There is work to do around the password key derivation algorithms and verifications on the back-end. As a consequence, your data could be overwritten by a malicious third party, however it would still be unreadable.
    </p>
    <p class="mt-4">
        <strong>"I don't see my text?"</strong> Make sure you enter the same password you used to create the note. To ensure you log into the correct note, you can save and copy your public identifier on your end and verify that the public identifier is the same after you login.
    </p>
    
    <p class="text-xs text-gray-600 my-5">
        <span class="text-base"><span class="font-semibold">Author: </span><a href="https://github.com/ab6d" class="text-blue-500 hover:text-blue-700">ab6d</a></span><br />
        For the Deno KV hackathon.<br />
        <span>Chat GPT</span> used for some of the "How it works" text, the Loader and some tailwind snippets.<br />
        <span>Source from <a href="https://bradyjoslin.com/blog/encryption-webcrypto/" class="text-blue-500 hover:text-blue-700">Brady Joslin's article</a> for most of the crypto algorithms </span>
    </p>
    </div>
  );
}
