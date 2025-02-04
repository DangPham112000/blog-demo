const crypto = require('crypto');

// J5
const J5 = crypto.createECDH('secp256k1'); // Use secp256k1 curve
J5.generateKeys();
const J5_privateKey = J5.getPrivateKey();
const J5_publicKey = J5.getPublicKey();
console.log("J5 Private Key:", J5_privateKey.toString('hex'));
console.log("J5 Public Key:", J5_publicKey.toString('hex'));
console.log('------');

// ST
const ST = crypto.createECDH('secp256k1');
ST.generateKeys();
const ST_privateKey = ST.getPrivateKey();
const ST_publicKey = ST.getPublicKey();
console.log("ST Private Key:", ST_privateKey.toString("hex"));
console.log("ST Public Key:", ST_publicKey.toString("hex"));
console.log('------');

// Exchange public keys and compute the session key
const J5_SessionKey = J5.computeSecret(ST_publicKey);
const ST_SessionKey = ST.computeSecret(J5_publicKey);

console.log("J5 Session Key:", J5_SessionKey.toString('hex'));
console.log("ST Session Key:", ST_SessionKey.toString('hex'));
