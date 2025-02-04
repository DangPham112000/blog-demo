const crypto = require('crypto');

// Input 1 (Hexadecimal)
const input1 = Buffer.from(
  'd131dd02c5e6eec4693d9a0698aff95c2fcab58712467eab4004583eb8fb7f89' +
  '55ad340609f4b30283e488832571415a085125e8f7cdc99fd91dbdf280373c5b' +
  'd8823e3156348f5bae6dacd436c919c6dd53e2b487da03fd02396306d248cda0' +
  'e99f33420f577ee8ce54b67080a80d1ec69821bcb6a8839396f9652b6ff72a70',
  'hex'
);

// Input 2 (Hexadecimal)
const input2 = Buffer.from(
  'd131dd02c5e6eec4693d9a0698aff95c2fcab50712467eab4004583eb8fb7f89' +
  '55ad340609f4b30283e4888325f1415a085125e8f7cdc99fd91dbd7280373c5b' +
  'd8823e3156348f5bae6dacd436c919c6dd53e23487da03fd02396306d248cda0' +
  'e99f33420f577ee8ce54b67080280d1ec69821bcb6a8839396f965ab6ff72a70',
  'hex'
);

// Function to calculate MD5 hash
function calculateMD5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

console.log('Are the inputs identical?', input1 === input2);

const hash1 = calculateMD5(input1);
const hash2 = calculateMD5(input2);

console.log('MD5 Hash of Input 1:', hash1);
console.log('MD5 Hash of Input 2:', hash2);

console.log('Are the hashes identical?', hash1 === hash2);
