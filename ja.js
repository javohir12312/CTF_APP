const crypto = require('crypto');

function generateMD5(input) {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex');
}

function crackMD5(hash) {
  const rainbowTable = {
    '6cd3556deb0da54bca060b4c39479839': 'Z28gdG8gdGhlIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8gd2Vic2l0ZSBhbmQgb3BlbiB3aXJlc2hhciBzbyB0aGVuIHlvdSBoYXZlIHRvIGZpbmQgaHR0cCByZXEgcGF0aGVzCg==',
  };
  
  if (rainbowTable[hash]) {
    return rainbowTable[hash];
  } else {
    return 'Hash not found in rainbow table';
  }
}
// argument
const providedHash = process.argv[2];

if (!providedHash) {
  console.log('Error: Please provide an MD5 hash as a command-line argument');
  process.exit(1);
}

const crackedValue = crackMD5(providedHash);
console.log('Cracked value:', crackedValue);

const decodedString = Buffer.from(crackedValue, 'base64').toString('utf-8');
console.log('Decoded string:', decodedString);
