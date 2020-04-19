import Wallet from 'identity-contracts/lib/wallet'
import faucet from './faucet'
import config from '../config'

let Plugin = {
  createIdentity (userData, config) {
    let wallet = new Wallet(config)
    return new Promise((resolve, reject) => {
      wallet
        .init({seedPhrase: userData.seedPhrase, pin: userData.pin})
        .then(address => {
          console.log('Wallet: ask for Ether ' + address)
          return faucet.askForEther(address)
        })
        // .then(result => {
        //   console.log('Transaction: Send Ether waiting to be mined ...')
        //   console.log(JSON.stringify(result))
        //   console.log(result.txHash)
        //   return wallet.waitingForTransactionToBeMined({
        //     transactionHash: result.txHash,
        //     maxWaitingTime: 100000
        //   })
        // })
        .then(result => {
          console.log('Create Digital Identity')
          return wallet.createDigitalIdentity({
            userName: userData.userName,
            pin: userData.pin
          })
        })
        .then(identityAddress => {
          console.log('Identity Address: ' + identityAddress)
          wallet.setIdentityAddress(identityAddress)
          return wallet.createLookupContract(userData.pin)
        })
        .then(lookupContractAddress => {
          console.log('lookupContract Address : ' + lookupContractAddress)
          wallet.setLookupAddress(lookupContractAddress)
          return wallet.addIdentityAddressToLookupContract({
            identityAddress: wallet.getIdentityAddress(),
            pin: userData.pin
          })
        })
        .then(transactionHash => {
          console.log('transactionHash  : ' + transactionHash)
          console.log(
            'WalletAgent: identityAddress addedtoLookupContract Transaction ' +
              'waiting to be mined txhash -> ' +
              transactionHash
          )
          return wallet.waitingToBeMined(transactionHash)
        })
        .then(transaction => {
          resolve(wallet)
        })
    })
  },
  AddAttribute (seedPhrase, pin, identityAddress, attributeId, attribute) {
    console.log('seedPhrase is :' + seedPhrase)
    console.log('attributeId is :' + attributeId)
    console.log('attribute is :' + attribute)
    console.log('identityAddress is :' + identityAddress)
    console.log('pin is :' + pin)
    let wallet = new Wallet(config)
    return new Promise((resolve, reject) => {
      wallet
      .init({seedPhrase: seedPhrase, pin: pin})
      .then(address => {
        console.log('Wallet: ask for Ether ' + address)
        return address
      })
      .then(() => {
        return wallet.addAttributeHashToIdentity({
          attributeId: attributeId,
          attribute: attribute,
          definitionUrl: '',
          pin: pin,
          identityAddress: identityAddress
        })
      }).then(txHash => {
        console.log('attribute added' + txHash)
        resolve(wallet)
      })
    })
  },
  getAttribute (seedPhrase, pin, identityAddress, attributeId) {
    let wallet = new Wallet(config)
    return new Promise((resolve, reject) => {
      wallet
      .init({seedPhrase: seedPhrase, pin: pin})
      .then(address => {
        return address
      })
      .then((address) => {
        console.log('Wallet address is ' + address)
        resolve(wallet.getAttributeHash(22, wallet.getIdentityAddress()))
      })
    })
  },
  loginWithSeedPhrase ({seedPhrase, pin, config}) {
    console.log('WalletAgent: Login with Seedphrase')
    console.log(seedPhrase)
    let wallet = new Wallet(config)
    return new Promise((resolve, reject) => {
      wallet
        .init({seedPhrase: seedPhrase, pin: pin})
        .then(result => {
          console.log('address is:')
          console.log(result)
          return wallet.createLookupContract(pin)
        })
        .then(lookupAddress => {
          console.log('lookupAddress is:')
          console.log(lookupAddress)
          wallet.setLookupAddress(lookupAddress)
          return wallet.getIdentityAddressFromLookupContract(lookupAddress)
        })
        .then(identityAddress => {
          console.log('WalletAgent: got identity Address from Lookup Table')
          console.log(identityAddress)
          wallet.setIdentityAddress(identityAddress)
          resolve(wallet)
        })
    })
  }
}

export default Plugin
