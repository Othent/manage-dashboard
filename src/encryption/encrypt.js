// encrypt file

import crypto from 'crypto'
import fs from 'fs'


// Function to encrypt a JPEG image with a password using AES algorithm
export async function encrypt(inputFile, password) {
  // Read file data
  const fileData = fs.readFileSync('input_files/' + inputFile);

  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(16);

  // Derive a key from the password using PBKDF2 algorithm with 10000 iterations and 32 bytes length
  const key = crypto.pbkdf2Sync(password, iv, 10000, 32, 'sha256');

  // Create a Cipher object with AES-256-CBC algorithm and the derived key and IV
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the file data with the Cipher object
  const encryptedData = Buffer.concat([cipher.update(fileData), cipher.final()]);

  // Write the encrypted data and the IV to the output file
  const outputData = Buffer.concat([iv, encryptedData]);
  const encrypted_file = 'input_files/encrypted_file.txt'
  fs.writeFileSync(encrypted_file, outputData);
  console.log('File encrypted')
  return encrypted_file
}