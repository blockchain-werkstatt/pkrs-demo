# Identity App

[![dependencies Status](https://img.shields.io/david/blockchain-werkstatt/identity-app)](https://img.shields.io/david/blockchain-werkstatt/identity-app)
[![devDependencies Status](https://img.shields.io/david/dev/blockchain-werkstatt/identity-app)](https://img.shields.io/david/dev/blockchain-werkstatt/identity-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Self Sovereign Identity App.

# ENV Variable
Currently ENV is hard coded, need to define development and production process.env's.

# Docker
```sh
  $ docker build -t identity-app . && docker run -p 8000:8001 identity-app
```

# Service Dependencies
1. [Shamir Service](https://github.com/blockchain-werkstatt/shamir-service)
2. [Identity Faucet](https://github.com/blockchain-werkstatt/identity-faucet)
3. [Ethereum RPC Network](https://github.com/blockchain-werkstatt/testrpc-network)
4. [Ether Fuel Service](https://github.com/blockchain-werkstatt/ether-fuel-service)
5. [IPFS Network](https://github.com/blockchain-werkstatt/ipfs-network)
