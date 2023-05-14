import fs from 'fs'
import Arweave from 'arweave/node/index.js';


const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
});

// Function to upload an encrypted file to Arweave
export async function upload(file_name) {
  // Read the encrypted file data
  const data = fs.readFileSync(file_name);

  // Read the Arweave wallet file
  const wallet = JSON.parse(fs.readFileSync('arweave/wallet.json'));

  // Create a Transaction object with the file data and metadata
  const transaction = await arweave.createTransaction({ data }, wallet);

  // Set the transaction tags with the metadata
  transaction.addTag('app', 'ArDrop'),
  transaction.addTag('file_name', file_name.toString()),
  transaction.addTag('contentType', 'text/plain')

  // Sign the transaction with the wallet
  await arweave.transactions.sign(transaction, wallet);

  // Broadcast the transaction to the network
  const response = await arweave.transactions.post(transaction);

  if (response.status === 200) {
    console.log(`File uploaded, ${transaction.id}`);
    return transaction.id
  } else {console.log('Failed to upload')}
}