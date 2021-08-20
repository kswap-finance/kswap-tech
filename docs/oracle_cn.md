# KSwap Oracle

KSwap Oracle 是一个基于 KSwap Dex 的去中心化的、可以免费使用的预言机，可以帮助 ExChain 社区开发者满足常见的查询需求（比如查询价格，查询 TVL，查询平均出块时间等）。助力 ExChain 搭建底层生态设施，为 ExChain 上的 DeFi 应用提供常用的数据服务。

KSwap Oracle 测试网地址：0xaEAaf9bE4F49aFb38801dd6aA43e4Fb324894761

KSwap Oracle 正式网地址：0x5d1F23b1564ce7A00C94f9Fa970D9c630369CA72

## 1. 查询单个代币的价格

价格查询有两种机制：平均价格和即时价格。平均价格通过 KSwap Oralce 合约记录的 price0Cumulative 和 price1Cumulative 计算而来，这两个数据每半小时通过 KSwap Dex 上的交易触发一次更新。即时价格为交易对里 reserve0 和 reserver1 的比值（已对精度进行处理）。开发者可以根据需求自行选择。

获取平均价格

```solidity
function getAveragePrice(address token) public view returns (uint256 price)
```

获取即时价格

```solidity
function getCurrentPrice(address token) public view returns (uint256 price)
```

参数为想要查询的 token 地址。

返回值为 price，单位是 USDT，精度同 USDT。比如 token 的精度为18， USDT 的精度为 10，那么通过该方法查询的就是 1e18 数量的token 对应的 USDT 的数量。

示例:

```javascript
await oracleContract.methods.getAveragePrice(process.env.BTCK).call();
await oracleContract.methods.getCurrentPrice(process.env.ETHK).call();
```

## 2. 查询 LPToken 的价值

LPToken 通过在 KSwap 添加交易对而产生。想要查询某个 lpToken 对应的 USDT 的价值，可以通过调用KSwap Oracle 合约的 `getLpTokenVaule`来查询。在 KSwap 上的所有 LPToken 的精度都为18.

```solidity
function getLpTokenValue(address _lpToken, uint256 _amount) public view returns (uint256 value)
```

参数：_lpToken 为交易对 LPToken 的地址。_amount 为 LPToken 的数量。

返回值：USDT 的估计值(带精度).

示例：

```javascript
await oracleContract.methods.getLpTokenValue(process.env.BTCK_USDT, 100000000).call();
```

如果想要查询一个交易对的 TVL，可以使用

```javascript
let totalSupply = await IERC20(_lpToken).methods.totalSupply().call();
await oracleContract.methods.getLpTokenValue(process.env.BTCK_USDT, totalSupply).call();
```

## 3. 查询 ExChain 平均出块时间

ExChain 节点出块时间不固定，测试网一般在3~6s 之间，为了更好的方便开发者获取出块时间，KSwap Oracle 提供了平均出块时间查询服务。KSwap Oracle 合约存储的区块数据每隔1000个区块经由 KSwap Dex 的交易自动触发更新。

```solidity
function getAverageBlockTime() public view returns (uint256) 
```

返回值为平均出块时间，单位为毫秒，比如 3555。

示例：

```javascript
await oracleContract.methods.getAverageBlockTime().call();
```


## 4. 示例代码

```javascript
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
```

上面代码执行后的返回值为：
```
caller 0xf38....6Eb91
Average KST Price: 591981550909
Current KST Price: 576078306452
Token value: 153905
Block time: 3569
```
