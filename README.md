# Deno Zero Knowledge Private Note Service

The Note Service that respects your privacy. Zero-knowledge achieved through browser-based encryption. It means that even if someone has access to the database, they can't read your messages.

## How It Works

**Note: This application is provided as is without any guarantee. There are still improvements to be done to ensure the actual security of the data.**

This application ensures the privacy of your notes using the following mechanisms:

1. **Private Key Storage:** Your private key is generated from the password you provide and is stored locally in your browser. It is never sent to the server, ensuring that only you have access to it.
2. **Password Protection:** Your notes are encrypted using the private key derived from your password. This means that only someone who knows your password can decrypt and access your notes.
3. **Secure Database:** Even if the database were to be leaked or compromised, the encrypted notes stored in the database would be of no use without the private key derived from your password. This adds an additional layer of security to protect your notes.

By combining these security measures, we ensure that your notes remain private and inaccessible to anyone without your password, providing you with peace of mind and confidentiality.

**Important missing feature:** We do not verify that the encrypted data comes from the correct key. There is work to do around the password key derivation algorithms and verifications on the back-end. As a consequence, your data could be overwritten by a malicious third party, however it would still be unreadable.

**"I don't see my text?"** Make sure you enter the same password you used to create the note. To ensure you log into the correct note, you can save and copy your public identifier on your end and verify that the public identifier is the same after you login.

**Author:** [ab6d](https://github.com/ab6d)
For the Deno KV hackathon.
Chat GPT used for some of the "How it works" text, the Loader, and some Tailwind snippets.
Source from [Brady Joslin's article](https://bradyjoslin.com/blog/encryption-webcrypto/) for most of the crypto algorithms.
