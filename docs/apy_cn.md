# 年化收益率计算

在区块链领域，年化收益率（APY）是把每个区块的收益率，换算成年收益率来计算。APY 常用于评估一个矿池值不值得参与。是所有 Farm 类产品都必须提供的一个基本信息。

它的计算公式为：

```
apy = (rewardPerBlock*24*3600*365*rewardTokenPrice)/(averageBlockTime * totalLockedValue);
```

我们以计算 DepositPool 里 USDT 的 APY 为例。在仅知道 USDT 地址的情况下，如果计算 USDT 在单币质押池里的 APY？

示例代码：

```javascript
const fs = require('fs');
const Web3 = require('web3');
require('dotenv').config({path: '../.env.example'});

const web3 = new Web3(process.env.RPC);

const oracleABI = JSON.parse(fs.readFileSync('../abis/Oracle.json'));
const oracleContract = new web3.eth.Contract(oracleABI, process.env.ORACLE);

const depositPoolABI = JSON.parse(fs.readFileSync('../abis/DepositPool.json'));
const depositPoolContract = new web3.eth.Contract(depositPoolABI, process.env.DEPOSIT_POOL);

const main = async () => {
  // get pool id
  const pid = await depositPoolContract.methods.tokenOfPid(process.env.USDT).call();

  // get reward per block for KST
  const totalAllocPoint = await depositPoolContract.methods.totalAllocPoint().call();
  const poolInfo = await depositPoolContract.methods.poolInfo(pid).call();
  const poolAllocPoint = poolInfo.allocPoint;
  const totalKstPerBlock = await depositPoolContract.methods.kstPerBlock().call()
  const poolKstPerBlock = poolAllocPoint * totalKstPerBlock / totalAllocPoint;

  const kstPrice = await oracleContract.methods.getAveragePrice(process.env.KST).call();
  const usdtPrice = await oracleContract.methods.getAveragePrice(process.env.USDT).call();
  const blockTime = await oracleContract.methods.getAverageBlockTime().call();

  const blocksPerYear = 3600 * 24 * 365 * 1000/ blockTime; // block time 单位是毫秒，所以要乘以1000

  // 两边各自除以自己的精度
  const blockApy = (poolKstPerBlock * kstPrice / 1e18) / (poolInfo.totalAmount * usdtPrice / 1e10);
  const apy = blocksPerYear * blockApy;
  console.log(apy);
}

main();
```

返回结果为 5.78, 跟运行时页面(https://app.kswap.finance/#/farm/deposit) USDT 的 APY 578% 一致。