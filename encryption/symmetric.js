const crypto = require('crypto');

function generateKeyAndIv() {
    const key = crypto.randomBytes(32).toString('hex'); // 256-bit key as hex string
    const iv = crypto.randomBytes(16).toString('hex'); // 128-bit IV as hex string
    return { key, iv };
}

function encrypt(text, keyHex, ivHex) {
    const key = Buffer.from(keyHex, 'hex'); // Convert key from hex to Buffer
    const iv = Buffer.from(ivHex, 'hex');   // Convert iv from hex to Buffer
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText, keyHex, ivHex) {
    const key = Buffer.from(keyHex, 'hex'); // Convert key from hex to Buffer
    const iv = Buffer.from(ivHex, 'hex');   // Convert iv from hex to Buffer
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Encrypt and decrypt a message
// const { key, iv } = generateKeyAndIv();
// console.log("Generated Key (hex):", key);
// console.log("Generated IV (hex):", iv);

// const message = "Hello, this is a secret message!";
// console.log("Original Message:", message);

// const encryptedMessage = encrypt(message, key, iv);
// console.log("Encrypted Message:", encryptedMessage);

// const decryptedMessage = decrypt(encryptedMessage, key, iv);
// console.log("Decrypted Message:", decryptedMessage);

// Decrypt a message with wrong key
// const { key, iv } = generateKeyAndIv();
// console.log("Generated Key (hex):", key);
// console.log("Generated IV (hex):", iv);

// const { key: key2 } = generateKeyAndIv();
// console.log("Generated Key 2 (hex):", key2);

// const message = "Hello, this is a secret message!";
// console.log("Original Message:", message);

// const encryptedMessage = encrypt(message, key, iv);
// console.log("Encrypted Message:", encryptedMessage);

// const decryptedMessage = decrypt(encryptedMessage, key2, iv);
// console.log("Decrypted Message:", decryptedMessage);

// Decrypt a message with wrong iv
const { key, iv } = generateKeyAndIv();
console.log("Generated Key (hex):", key);
console.log("Generated IV (hex):", iv);

const { iv: iv2 } = generateKeyAndIv();
console.log("Generated IV2 (hex):", iv2);

const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
console.log("Original Message:", message);

const encryptedMessage = encrypt(message, key, iv);
console.log("Encrypted Message:", encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, key, iv2);
console.log("Decrypted Message:", decryptedMessage);