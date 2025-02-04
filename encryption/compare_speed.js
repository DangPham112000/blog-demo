const crypto = require('crypto');
const { performance } = require('perf_hooks');

function measurePerformance(func, ...args) {
    const startTime = performance.now();
    const result = func(...args);
    const endTime = performance.now();
    console.log(`${func.name} execution time:`, (endTime - startTime).toFixed(2), 'ms');
    return result;
}

function hashSHA512(message) {
    const hash = crypto.createHash('sha512');
    hash.update(message);
    return hash;
}

function generateKeyAndIV() {
    const key = crypto.randomBytes(32); // 256-bit key (32 bytes, the longest allowed by AES)
    const iv = crypto.randomBytes(12); // 96-bit IV (12 bytes, recommended for GCM)
    return { key, iv };
}

function encryptAESGCM(key, iv, plaintext) {
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedAES = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag()
    return { encryptedAES, authTag };
}

function decryptAESGCM(key, iv, encrypted, authTag) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted;
}

const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
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
    return encrypted;
}

function decryptWithPrivateKey(privateKeyPem, encryptedMessage) {
    const decrypted = crypto.privateDecrypt(privateKeyPem, encryptedMessage);
    return decrypted;
}

function signWithPrivateKey(privateKeyPem, message) {
    const encrypted = crypto.privateEncrypt(privateKeyPem, Buffer.from(message));
    return encrypted; 
}

function verifyWithPublicKey(publicKeyPem, encryptedMessage) {
    const decrypted = crypto.publicDecrypt(publicKeyPem, encryptedMessage);
    return decrypted; 
}

function generateDummyText(byteLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';
    let currentLength = 0;

    while (currentLength < byteLength) {
        const char = characters.charAt(Math.floor(Math.random() * charactersLength));
        result += char;
        currentLength = Buffer.byteLength(result, 'utf8');
        if (currentLength > byteLength) {
            result = result.slice(0, -1);
            break;
        }
    }

    return result;
}


const message = generateDummyText(470); // Maximun byte RSA-4096-PKCS1 can encrypt
console.log("Original Message:", message);


const { publicKey, privateKey } = generateKeyPair();
const { key, iv } = generateKeyAndIV();


const hash = measurePerformance(hashSHA512, message);
const { encryptedAES, authTag } = measurePerformance(encryptAESGCM, key, iv, message)
const decryptedAES = measurePerformance(decryptAESGCM, key, iv, encryptedAES, authTag);
const encryptedMessage = measurePerformance(encryptWithPublicKey, publicKey, message);
const decryptedMessage = measurePerformance(decryptWithPrivateKey, privateKey, encryptedMessage);
const signedMessage = measurePerformance(signWithPrivateKey, privateKey, message);
const verifiedMessage = measurePerformance(verifyWithPublicKey, publicKey, signedMessage);


console.log("SHA-512 hashed message:", hash.digest('hex'));
console.log("AES decrypted message:", decryptedAES.toString('utf8'));
console.log("RSA decrypted message:", decryptedMessage.toString('utf8'));
console.log("RSA verified message:", verifiedMessage.toString('utf8'));
