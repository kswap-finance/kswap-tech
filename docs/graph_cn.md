修改`package.json`里的内容为：

```json
  "scripts": {
    "codegen": "graph codegen --output-dir src/types/",
    "build": "graph build",
    "create-local": "graph create kswap-finance/kswap-governance-subgraph --node http://graphtest.kswap.finance:8020",
    "deploy-local": "graph deploy kswap-finance/kswap-governance-subgraph --debug --ipfs http://graphtest.kswap.finance:5001 --node http://graphtest.kswap.finance:8020",
    "watch-local": "graph deploy kswap-finance/kswap-governance-subgraph --watch --debug --node http://graphtest.kswap.finance:8020/ --ipfs http://graphtest.kswap.finance:5001"
  },
```

然后执行命令

```bash
yarn && yarn codegen
yarn create-local
yarn deploy_local
```