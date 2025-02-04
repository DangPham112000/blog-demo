const crypto = require('crypto');

// J5
const J5 = crypto.createDiffieHellman(2048); // Prime will be 2048bit long
const G = J5.getGenerator();
const P = J5.getPrime();
console.log("P:", P.toString("hex"));
console.log("G:", G.toString("hex"));
console.log('------');
J5.generateKeys();
const J5_privateKey = J5.getPrivateKey();
const J5_publicKey = J5.getPublicKey();
console.log("J5 Private Key:", J5_privateKey.toString('hex'));
console.log("J5 Public Key:", J5_publicKey.toString('hex'));
console.log('------');

// ST
const ST = crypto.createDiffieHellman(P, G);
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