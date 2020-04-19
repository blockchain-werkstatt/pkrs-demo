# Identity Faucet Service

[![dependencies Status](https://img.shields.io/david/blockchain-werkstatt/identity-faucet)](https://img.shields.io/david/blockchain-werkstatt/identity-faucet)
[![devDependencies Status](https://img.shields.io/david/dev/blockchain-werkstatt/identity-faucet)](https://img.shields.io/david/dev/blockchain-werkstatt/identity-faucet)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Service is reponsible to communicate with the [Identity App](https://github.com/blockchain-werkstatt/identity-app) and exposing endpoints to fuel ether if needed using [Ether Fuel Service](https://github.com/blockchain-werkstatt/ether-fuel-service) and also exposes IPFS endpoints which allow upload and fetch from [decentralized storage](https://github.com/blockchain-werkstatt/ipfs-network).

# Docker

```sh
$ docker build -t identity-faucet . && docker run -p 4000:4000 identity-faucet
```
# Local Deployment
```sh
$ https://github.com/blockchain-werkstatt/identity-faucet.git
$ cd identity-faucet
$ npm install
$ npm start
or
$ npm run dev (for dev mode)
```

# Configuration
**config can be found in src/config.js**
```sh
const config = {
    fuelservice : process.env.FUEL_SERVICE ||'http://ether-fuel-service.okd.fokus.fraunhofer.de',
    ethereumAddress : process.env.ETHEREUM_ADDRESS || 'http://testrpc-network.okd.fokus.fraunhofer.de',//geth network (incorrect naming convension)
    port : process.env.PORT || '4000',
    ipfsAddress :process.env.IPFS_ADDRESS  || 'ipfs-daemon-identity-system-blockchain.okd.fokus.fraunhofer.de', 
    ipfsPort : process.env.IPFS_PORT  || 5001,
    ipfsProtocol : process.env.IPFS_PROTOCOL || 'http'
}
```
# Api End-Points

1.**To Store the File to IPFS**
----
returns json of hash and size
* **URL**
  * `/ipfs`
* **Method:**
  * `POST`
* **Header:**
  * `Content-Type:multipart/form-data`
*  **Request Body**
    `{PATH_OF_FILE_IN_FORM_DATA}`

* **Success Response:**
 ```json
 {
    "hash": "QmVszTdPpVZfJRAg1RYnQZe83nQJGKnuDH5na6C1MdMyBk",
    "size": 13038
} 
```

2.**To Get the File from IPFS**
----
returns json of hash and size
* **URL**
  * `/ipfs/:hash`
* **Method:**
  * `GET`
* **Header:**
  * `Content-Type:application/json`

* **Success Response:**

 ```js
return the file
```

3.**Request Balanace**
----

* **URL**
  * `/ether?address=0x3Fcb4E0EC94336F7bA098fF1c9270969b4dd84a6`

* **Method:**

  * `GET`

* **Success Response:**
* 
```json
 {
    "success": "transaction send",
    "txHash": "6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0"
}
```
