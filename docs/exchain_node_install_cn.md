# OKExChain 节点安装

## 1. 系统要求

CPU: 8核以上，主频 3.5 GHz 以上 

内存： 16G 以上

硬盘：200G 以上

系统：本文档在 Ubuntu 18.04 操作

## 2. 修改系统参数

```bash
vim /etc/security/limits.conf
```

把以下内容加入到文件

```text
root soft  nofile 163840
root hard  nofile 163840
```

## 2. 安装依赖

```bash
apt-get install ntp wget gcc g++ autoconf automake python build-essential curl git libssl-dev openssl make  -y
```

## 3. 安装 Go

```bash
wget https://golang.org/dl/go1.16.2.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.2.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin  加到.profile
source /etc/profile
```

此时运行 `go version` 会出现

```bash
root@VM-0-3-ubuntu:~# go version
go version go1.16.2 linux/amd64
```

## 4. 克隆代码

```bash
git clone -b v0.18.3 https://github.com/okex/exchain
```

## 5. 安装 OKExChain

```bash
cd exchain
export GO111MODULE=on
make GenesisHeight=2322600 install
./go/bin/exchaind init kswap --chain-id okexchain-66 --home ~/.okexchaind # 注意这里要把 kswap 换成别的名字
wget https://raw.githubusercontent.com/okex/mainnet/main/genesis.json -O ~/.okexchaind/config/genesis.json
```

## 6. 下载快照

打开[快照页面](https://okexchain-docs.readthedocs.io/en/latest/resources/snapshot.html)


```bash
wget https://ok-public-hk.oss-cn-hongkong.aliyuncs.com/cdn/okexchain/snapshot/okexchain-v0.18.4-mainnet-20210510-height_2676566.tar.gz

tar zvxf okexchain-v0.18.4-mainnet-20210510-height_2676566.tar.gz -C ~/.okexchaind/
```

注：快照链接会有更新，请以页面最新快照为准。

## 7. 启动

```bash
export EXCHAIN_SEEDS="e926c8154a2af4390de02303f0977802f15eafe2@3.16.103.80:26656,7fa5b1d1f1e48659fa750b6aec702418a0e75f13@35.177.8.240:26656,c8f32b793871b56a11d94336d9ce6472f893524b@18.167.16.85:26656"
./go/bin/exchaind start --chain-id exchain-66 --home ~/.okexchaind  --p2p.seeds $EXCHAIN_SEEDS
```

## 8. 其他常用命令

查看节点状态 `./go/bin/exchaincli status`

