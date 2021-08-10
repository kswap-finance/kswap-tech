# Convert to checksum address 

`web3.utils.toChecksumAddress(address)` can help you do that.

Sample ：
```
web3.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff2323');
> "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"

web3.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
> "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" 
```

Or you can simply go to https://tools.kswap.finance