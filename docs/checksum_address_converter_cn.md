# 转换为符合 checksum 的地址

`web3.utils.toChecksumAddress(address)`可以把全大写或者全小写的地址转换为符合 checksum 的地址。

示例：
```
web3.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff2323');
> "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"

web3.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
> "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" 
```

也可以直接在 https://tools.kswap.finance 完成转换。