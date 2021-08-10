# 矿池文档

## 1.1 Liquidity Pool

#### 1.1.1 UserView

```
    struct UserView {
        uint256 stakedAmount; // 质押的 LP Token 数量
        uint256 unclaimedRewards; // 未领取的 KST 数量
        uint256 lpBalance; // LP Token 余额
        uint256 accKstAmount; // 累计获得的 KST 数量
    }
```

#### 1.1.2 PoolView

```
    struct PoolView {
        uint256 pid; // Pool ID
        address lpToken; // LP Token 地址
        uint256 allocPoint; // 分配权重
        uint256 lastRewardBlock; // 上次奖励的区块
        uint256 rewardsPerBlock; // 每个区块奖励的 KST 数量
        uint256 accKstPerShare;  //
        uint256 allocKstAmount; // 当前池子待分配 KST 数量
        uint256 accKstAmount; // 当前池子累计 KST 奖励数量
        uint256 totalAmount; // 累计 LP Token 数量
        address token0;  // token0 地址
        string symbol0;  // token0 的 symbol
        string name0;  // token0 的 name
        uint8 decimals0; // token0 的 decimal
        address token1; // token1 地址
        string symbol1; // token1 的 symbol
        string name1; // token1 的 name
        uint8 decimals1; // token1 的 decimal
    }
```

#### 1.1.3 获取所有矿池长度

function getPairsLength() public view returns (uint256);

参数描述：无

返回数据：流动性挖矿支持的交易对的长度

#### 1.1.4 根据 id 获得矿池地址

function getPairs(uint256 \_index) public view returns (address)

参数描述：pool id

返回数据：pool id 所对应的 LP Token 地址

#### 1.1.5 根据 id 获得矿池信息

function getPoolView(uint256 pid) public view returns (PoolView);

参数描述：pool id

返回数据：pool id 所对应的矿池信息，格式为 PoolView

```
{
  0,
  0x147608dfeEEB05FD149784B9b740F71BabE8b69C,
  80,
  1211103,
  8000000000000000000,
  11162870241097088797895,
  204720454594968106810121,
  205846844466310619506678,
  459718653323436,
  0x09973e7e3914EB5BA69C7c025F30ab9446e3e4e0,
  BTCK,
  BTCK,
  10,
  0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281,
  USDT,
  USDT,
  10
}
```

#### 1.1.6 根据 LP Token 地址获取矿池信息

function getPoolViewByAddress(address lpToken) public view returns (PoolView);

参数描述: LP Token 地址

返回数据: LP Token 地址所对应的矿池信息，格式为 PoolView

```
{
  0,
  0x147608dfeEEB05FD149784B9b740F71BabE8b69C,
  80,
  1211103,
  8000000000000000000,
  11162870241097088797895,
  204720454594968106810121,
  205846844466310619506678,
  459718653323436,
  0x09973e7e3914EB5BA69C7c025F30ab9446e3e4e0,
  BTCK,
  BTCK,
  10,
  0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281,
  USDT,
  USDT,
  10
}
```

#### 1.1.7 获取所有矿池信息

function getAllPoolViews() external view returns (PoolView[]);

参数描述：无

返回数据：所以矿池信息的数组 PoolView[]

#### 1.1.8 获取用户在某一个矿池的信息

function getUserView(address lpToken, address account) public view returns (UserView);

参数描述：lpToken(LP Token 地址)，account(用户地址)

返回数据：用户在当前矿池的信息，格式为 UserView

```
{
  20000000000000,
  4937488418945023258520,
  2216067977498789,
  248299282895959242880370
}
```

#### 1.1.9 获取用户在所有矿池的信息

function getUserViews(address account) external view returns (UserView[]);

参数描述：用户地址

返回数据：用户所有的矿池信息，格式为 UserView[]

#### 1.1.10 获取用户在某个矿池的待领取 KST 奖励

function pendingKst(uint256 \_pid, address \_user) public view returns (uint256);

参数描述：\_pid(矿池 id)， \_user(用户地址)

返回数据：待领取 KST 奖励



### 1.2 Trading Pool

#### 1.2.1 UserView

```
    struct UserView {
        uint256 quantity; // 当前算力
        uint256 accQuantity; // 累计算力
        uint256 unclaimedRewards; // 待领取 KST 奖励
        uint256 accKstAmount; // 累计领取的 KST 奖励
    }
```

#### 1.2.2 PoolView

```
    struct PoolView {
        uint256 pid; // Pool ID
        address pair; // LP Token 地址
        uint256 allocPoint; // 分配权重
        uint256 lastRewardBlock; // 上次奖励的区块
        uint256 rewardsPerBlock; // 每个区块奖励的 KST 数量
        uint256 accKstPerShare;  //
        uint256 allocKstAmount; // 当前池子待分配 KST 数量
        uint256 accKstAmount; // 当前池子累计 KST 奖励数量
        uint256 quantity; // 当前池子总算力
        uint256 accQuantity; // 池子累计算力
        address token0;  // token0 地址
        string symbol0;  // token0 的 symbol
        string name0;  // token0 的 name
        uint8 decimals0; // token0 的 decimal
        address token1; // token1 地址
        string symbol1; // token1 的 symbol
        string name1; // token1 的 name
        uint8 decimals1; // token1 的 decimal
    }
```

#### 1.2.3 获取所有矿池长度

function getPairsLength() public view returns (uint256);

参数描述：无

返回数据：当前所有矿池长度

#### 1.2.4 根据 id 获得矿池地址

function getPairs(uint256 \_index) public view returns (address)

参数描述：pool id

返回数据：pool id 所对应的 LP Token 地址

#### 1.2.5 根据 id 获得矿池信息

function getPoolView(uint256 pid) public view returns (PoolView);

参数描述：pool id

返回数据：pool id 所对应的矿池信息，格式为 PoolView

```
{
  0,
  0x147608dfeEEB05FD149784B9b740F71BabE8b69C,
  80,
  1211375,
  8000000000000000000,
  11818099648289020208,
  216886686568843739373784,
  219250400000000000000000,
  5041836114007644929,
  5194134066507771109,
  0x09973e7e3914EB5BA69C7c025F30ab9446e3e4e0,
  BTCK,
  BTCK,
  10,
  0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281,
  USDT,
  USDT,
  10
}
```

#### 1.2.6 根据 LP Token 地址获取矿池信息

function getPoolViewByAddress(address lpToken) public view returns (PoolView);

参数描述: LP Token 地址

返回数据: LP Token 地址所对应的矿池信息，格式为 PoolView

```
{
  0,
  0x147608dfeEEB05FD149784B9b740F71BabE8b69C,
  80,
  1211375,
  8000000000000000000,
  11818099648289020208,
  216886686568843739373784,
  219250400000000000000000,
  5041836114007644929,
  5194134066507771109,
  0x09973e7e3914EB5BA69C7c025F30ab9446e3e4e0,
  BTCK,
  BTCK,
  10,
  0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281,
  USDT,
  USDT,
  10
}
```

#### 1.2.7 获取所有矿池信息

function getAllPoolViews() external view returns (PoolView[]);

参数描述：无

返回数据：所以矿池信息的数组 PoolView[]

#### 1.2.8 获取用户在某一个矿池的信息

function getUserView(address lpToken, address account) public view returns (UserView);

参数描述：lpToken(LP Token 地址)，account(用户地址)

返回数据：用户在当前矿池的信息，格式为 UserView

```
{
 0,
 50769221025681,
 0,
 16028168716695069595
}
```

#### 1.2.9 获取用户在所有矿池的信息

function getUserViews(address account) external view returns (UserView[]);

参数描述：用户地址

返回数据：用户所有的矿池信息，格式为 UserView[]

#### 1.2.10 获取用户在某个矿池的待领取 KST 奖励

function pendingKst(uint256 \_pid, address \_user) public view returns (uint256);

参数描述：\_pid(矿池 id)， \_user(用户地址)

返回数据：待领取 KST 奖励


### 1.3 Deposit Pool

#### 3.1.1 UserView

```
    struct UserView {
        uint256 stakedAmount; // 质押数量
        uint256 unclaimedRewards; // 待领取 KST 奖励
        uint256 tokenBalance; // 余额
        uint256 accKstAmount; // 累计领取的 KST 奖励
    }
```

#### 3.1.2 PoolView

```
    struct PoolView {
        uint256 pid; // Pool ID
        uint256 allocPoint; // 分配权重
        uint256 lastRewardBlock; // 上次奖励的区块
        uint256 rewardsPerBlock; // 每个区块奖励的 KST 数量
        uint256 accKstPerShare;  //
        uint256 allocKstAmount; // 当前池子待分配 KST 数量
        uint256 accKstAmount; // 当前池子累计 KST 奖励数量
        uint256 totalAmount; // 当前池子的 token 总量
        address token0;  // token 地址
        string symbol0;  // token 的 symbol
        string name0;  // token 的 name
        uint8 decimals0; // token 的 decimal
    }
```

#### 1.3.3 获取所有矿池长度

function getTokensLength() public view returns (uint256);

参数描述：无

返回数据：当前所有矿池长度

#### 1.3.4 根据 id 获得矿池地址

function getTokens(uint256 \_index) public view returns (address)

参数描述：pool id

返回数据：pool id 所对应的 LP Token 地址

#### 1.3.5 根据 id 获得矿池信息

function getPoolView(uint256 pid) public view returns (PoolView);

参数描述：pool id

返回数据：pool id 所对应的矿池信息，格式为 PoolView

```
{
  0,
  15,
  1211494,
  1600000000000000000,
  41266691645935080727,
  24711052324764238061565,
  25202993672849952872653,
  280422051000629063970093,
  0x2219845942d28716c0F7C605765fABDcA1a7d9E0,
  WOKT,
  Wrapped OKT,
  18
}
```

#### 1.3.6 根据 LP Token 地址获取矿池信息

function getPoolViewByAddress(address lpToken) public view returns (PoolView);

参数描述: LP Token 地址

返回数据: LP Token 地址所对应的矿池信息，格式为 PoolView

```
{
  0,
  15,
  1211494,
  1600000000000000000,
  41266691645935080727,
  24711052324764238061565,
  25202993672849952872653,
  280422051000629063970093,
  0x2219845942d28716c0F7C605765fABDcA1a7d9E0,
  WOKT,
  Wrapped OKT,
  18
}
```

#### 1.3.7 获取所有矿池信息

function getAllPoolViews() external view returns (PoolView[]);

参数描述：无

返回数据：所以矿池信息的数组 PoolView[]

#### 1.3.8 获取用户在某一个矿池的信息

function getUserView(address lpToken, address account) public view returns (UserView);

参数描述：lpToken(LP Token 地址)，account(用户地址)

返回数据：用户在当前矿池的信息，格式为 UserView

```
{
  100000000000000,
  4126669164636300713100,
  90078704680329001278865,
  0
}
```

#### 1.3.9 获取用户在所有矿池的信息

function getUserViews(address account) external view returns (UserView[]);

参数描述：用户地址

返回数据：用户所有的矿池信息，格式为 UserView[]

#### 3.1.10 获取用户在某个矿池的待领取 KST 奖励

function pendingKst(uint256 \_pid, address \_user) public view returns (uint256);

参数描述：\_pid(矿池 id)， \_user(用户地址)

返回数据：待领取 KST 奖励