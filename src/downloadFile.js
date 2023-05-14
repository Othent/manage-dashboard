export default async function downloadFile() {

    const transaction_id = 'gB9JnI1kQM4yYHpoyFeL1uusI5zruw9Lgxdz3xdb1DE'


    const req = await fetch('https://arweave.net/txn/' + transaction_id + '/data')
    console.log(req)
}