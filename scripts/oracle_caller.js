const fs = require('fs');
const Web3 = require('web3');
require('dotenv').config({path: './.env.example'});

const web3 = new Web3(process.env.RPC);

const caller = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
console.log("caller", caller.address);

const oracleABI = JSON.parse(fs.readFileSync('../abis/Oracle.json'));
const oracleContract = new web3.eth.Contract(oracleABI, process.env.ORACLE);

const main = async () => {
  const averagePrice = await oracleContract.methods.getAveragePrice(process.env.KST).call()
  const currentPrice = await oracleContract.methods.getCurrentPrice(process.env.KST).call()
  const tokenValue = await oracleContract.methods.getLpTokenValue(process.env.KST_USDT, 100000000).call()
  const blockTime = await oracleContract.methods.getAverageBlockTime().call();

  console.log('Average KST Price:', averagePrice);
  console.log('Current KST Price:', currentPrice);
  console.log('Token value:', tokenValue);
  console.log('Block time:', blockTime);
}

main();