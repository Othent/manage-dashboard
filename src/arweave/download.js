import Arweave from 'arweave/node/index.js';
import fs from 'fs'

const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
});

export async function download(transactionId) {

  // Download the data for the confirmed transaction
  const data = await arweave.transactions.getData(transactionId, { decode: true });
  console.log(data)
}
