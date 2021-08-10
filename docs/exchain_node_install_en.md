# OKExChain Full Node Installation Guide

## 1. Requirements

CPU: 8 core+，3.5GHz+

Memory： 16G+

Disk：200G+

Operating System: this document is operated under Ubuntu 18.04

## 2. Modify system configuration

```bash
vim /etc/security/limits.conf
```

add content to file

```text
root soft  nofile 163840
root hard  nofile 163840
```

## 2. Install requirements

```bash
apt-get install ntp wget gcc g++ autoconf automake python build-essential curl git libssl-dev openssl make  -y
```

## 3. Install Go

```bash
wget https://golang.org/dl/go1.16.2.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.2.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin  加到.profile
source /etc/profile
```

Run `go version` 

```bash
root@VM-0-3-ubuntu:~# go version
go version go1.16.2 linux/amd64
```

## 4. Clone code

```bash
git clone -b v0.18.3 https://github.com/okex/exchain
```

## 5. Install OKExChain

```bash
cd exchain
export GO111MODULE=on
make GenesisHeight=2322600 install
./go/bin/exchaind init kswap --chain-id okexchain-66 --home ~/.okexchaind # change kswap to another name
wget https://raw.githubusercontent.com/okex/mainnet/main/genesis.json -O ~/.okexchaind/config/genesis.json
```

## 6. Download snapshot

Open [Snapshot webpage](https://okexchain-docs.readthedocs.io/en/latest/resources/snapshot.html)


```bash
wget https://ok-public-hk.oss-cn-hongkong.aliyuncs.com/cdn/okexchain/snapshot/okexchain-v0.18.4-mainnet-20210510-height_2676566.tar.gz

tar zvxf okexchain-v0.18.4-mainnet-20210510-height_2676566.tar.gz -C ~/.okexchaind/
```

Notice: this link will be updated regularly

## 7. Start the node

```bash
export EXCHAIN_SEEDS="e926c8154a2af4390de02303f0977802f15eafe2@3.16.103.80:26656,7fa5b1d1f1e48659fa750b6aec702418a0e75f13@35.177.8.240:26656,c8f32b793871b56a11d94336d9ce6472f893524b@18.167.16.85:26656"
./go/bin/exchaind start --chain-id exchain-66 --home ~/.okexchaind  --p2p.seeds $EXCHAIN_SEEDS
```

## 8. Common commands

Check node status `./go/bin/exchaincli status`

