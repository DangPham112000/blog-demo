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

// Function to "sign" (encrypt) a message using RSA private key
function signWithPrivateKey(privateKeyPem, message) {
    const encrypted = crypto.privateEncrypt(privateKeyPem, Buffer.from(message));
    return encrypted.toString('base64');  // Convert encrypted message to base64 for readability
}

// Function to "verify" (decrypt) a message using RSA public key
function verifyWithPublicKey(publicKeyPem, encryptedMessage) {
    const decrypted = crypto.publicDecrypt(publicKeyPem, Buffer.from(encryptedMessage, 'base64'));
    return decrypted.toString('utf8');  // Convert decrypted message to utf8 string
}



// Private key to encrypt and public key to decrypt a message
// const { publicKey, privateKey } = generateKeyPair();
// console.log("Public Key (PEM format):\n", publicKey);
// console.log("Private Key (PEM format):\n", privateKey);

// const message = "J5 love ST";
// console.log("Original Message:", message);

// // "Sign" the message using the private key (Encrypt)
// const encryptedMessage = signWithPrivateKey(privateKey, message);
// console.log("Encrypted Message (Base64):", encryptedMessage);

// // "Verify" the message using the public key (Decrypt)
// const decryptedMessage = verifyWithPublicKey(publicKey, encryptedMessage);
// console.log("Decrypted Message:", decryptedMessage);



// Public key to encrypt and public key to decrypt a message
// const { publicKey } = generateKeyPair();
// console.log("Public Key (PEM format):\n", publicKey);

// const message = "J5 love ST";
// console.log("Original Message:", message);

// const encryptedMessage = signWithPrivateKey(publicKey, message);
// console.log("Encrypted Message (Base64):", encryptedMessage);

// const decryptedMessage = verifyWithPublicKey(publicKey, encryptedMessage);
// console.log("Decrypted Message:", decryptedMessage);



// Public key to encrypt and private key to decrypt a message
// const { publicKey, privateKey } = generateKeyPair();
// console.log("Public Key (PEM format):\n", publicKey);
// console.log("Private Key (PEM format):\n", privateKey);

// const message = "J5 love ST";
// console.log("Original Message:", message);

// // "Sign" the message using the private key (Encrypt)
// const encryptedMessage = signWithPrivateKey(publicKey, message);
// console.log("Encrypted Message (Base64):", encryptedMessage);

// // "Verify" the message using the public key (Decrypt)
// const decryptedMessage = verifyWithPublicKey(privateKey, encryptedMessage);
// console.log("Decrypted Message:", decryptedMessage);



// Private key to encrypt and private key to decrypt a message
const { privateKey } = generateKeyPair();
console.log("Private Key (PEM format):\n", privateKey);

const message = "J5 love ST";
console.log("Original Message:", message);

// "Sign" the message using the private key (Encrypt)
const encryptedMessage = signWithPrivateKey(privateKey, message);
console.log("Encrypted Message (Base64):", encryptedMessage);

// "Verify" the message using the public key (Decrypt)
const decryptedMessage = verifyWithPublicKey(privateKey, encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);
