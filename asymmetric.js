const crypto = require('crypto');

const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Length of key in bits (2048 is standard)
        publicKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standards 1
            format: 'pem'  // Output as PEM (Base64 encoded)
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Private Key Cryptography Standards 1
            format: 'pem'  // Output as PEM (Base64 encoded)
        }
    });
}

function encryptWithPublicKey(publicKeyPem, message) {
    const encrypted = crypto.publicEncrypt(publicKeyPem, Buffer.from(message));
    return encrypted.toString('base64');  // Convert encrypted message to base64 for readability
}

function decryptWithPrivateKey(privateKeyPem, encryptedMessage) {
    const decrypted = crypto.privateDecrypt(privateKeyPem, Buffer.from(encryptedMessage, 'base64'));
    return decrypted.toString('utf8');  // Convert decrypted message to utf8 string
}

// Public key to encrypt and private key to decrypt a message
// const { publicKey, privateKey } = generateKeyPair();
// console.log("Public Key (PEM format):\n", publicKey);
// console.log("Private Key (PEM format):\n", privateKey);

// const message = "Hello, this is a secret message!";
// console.log("Original Message:", message);

// const encryptedMessage = encryptWithPublicKey(publicKey, message);
// console.log("Encrypted Message:", encryptedMessage);

// const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);
// console.log("Decrypted Message:", decryptedMessage);

// Private key to encrypt and decrypt a message
// const { privateKey } = generateKeyPair();
// console.log("Private Key (PEM format):\n", privateKey);

// const message = "Hello, this is a secret message!";
// console.log("Original Message:", message);

// const encryptedMessage = encryptWithPublicKey(privateKey, message);
// console.log("Encrypted Message:", encryptedMessage);

// const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);
// console.log("Decrypted Message:", decryptedMessage);


// Private key to encrypt and public key to decrypt a message
const { publicKey, privateKey } = generateKeyPair();
console.log("Public Key (PEM format):\n", publicKey);
console.log("Private Key (PEM format):\n", privateKey);

const message = "Hello, this is a secret message!";
console.log("Original Message:", message);

const encryptedMessage = encryptWithPublicKey(privateKey, message);
console.log("Encrypted Message:", encryptedMessage);

const decryptedMessage = decryptWithPrivateKey(publicKey, encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);