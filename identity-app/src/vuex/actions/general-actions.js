import Wallet from 'identity-contracts/lib/wallet'

import router from '../../router'

import identityService from '../../services/identityService'
import CONFIG from '../../config'

let wallet = new Wallet(CONFIG)

const BASIC_ATTRIBUTES = {
  EMAIL: 'email',
  BIRTHDAY: 'birthday'
}

export const logout = function ({commit}) {
  console.log('Action: Logout')
  router.push('/')
  commit('setInitialState')
}

export const generateRandomSeed = function ({commit}, params) {
  let seedPhrase = wallet.generateRandomSeed(params.entropy)
  commit('setIdentitySeedPhrase', seedPhrase)
}

export const routerTo = function ({commit}, to) {
  router.push(to)
}

export const createDigitalIdentity = function ({commit}, userData) {
  console.log('create Digital Identity')
  router.push('/generate')

  let mainAddress
  identityService
    .createIdentity(userData, CONFIG)
    .then(_wallet => {
      wallet = _wallet
      mainAddress = wallet.getMainAddress()
      commit('setIdentityMainAdress', mainAddress)
      commit('setFirstTimeLogin', false)
      commit('setAuthenticationDone', true)
      commit('setLoggedIn', true)

      let identityAddress = wallet.getIdentityAddress()
      console.log('ID->' + identityAddress)
      userData.identityAddress = identityAddress
      commit('setUserData', userData)

      commit('setUserHasSeedWrittenDown', true)
      // seedPhrase shouldn't be in the state
      commit('setIdentitySeedPhrase', undefined)
    })
    .then(() => {
      wallet
        .getBalance(mainAddress)
        .then(balance => {
          commit('setBalance', balance)
          // add basic attributes
          return wallet.addAttributeHashToIdentity({
            attributeId: BASIC_ATTRIBUTES.EMAIL,
            attribute: userData.email,
            definitionUrl: 'http://',
            pin: userData.pin,
            identityAddress: wallet.getIdentityAddress()
          })
        })
        .then(txHash => {
          console.log('Add Email Hash' + txHash)
          return wallet.addAttributeHashToIdentity({
            attributeId: BASIC_ATTRIBUTES.BIRTHDAY,
            attribute: userData.birthday,
            definitionUrl: 'http://',
            pin: userData.pin,
            identityAddress: wallet.getIdentityAddress()
          })
        })
        .then(txHash => {
          console.log('Add Birthday Hash' + txHash)
        })
    })
}

export const AddAtributes = function ({commit}, userData) {
  console.log('create Digital Identity')
  router.push('/generate')

  let mainAddress
  identityService
    .createIdentity(userData, CONFIG)
    .then(_wallet => {
      wallet = _wallet
      mainAddress = wallet.getMainAddress()
      commit('setIdentityMainAdress', mainAddress)
      commit('setFirstTimeLogin', false)
      commit('setAuthenticationDone', true)
      commit('setLoggedIn', true)

      let identityAddress = wallet.getIdentityAddress()
      console.log('ID->' + identityAddress)
      userData.identityAddress = identityAddress
      commit('setUserData', userData)

      commit('setUserHasSeedWrittenDown', true)
      // seedPhrase shouldn't be in the state
      commit('setIdentitySeedPhrase', undefined)
    })
    .then(() => {
      wallet
        .getBalance(mainAddress)
        .then(balance => {
          commit('setBalance', balance)
          // add basic attributes
          return wallet.addAttributeHashToIdentity({
            attributeId: BASIC_ATTRIBUTES.EMAIL,
            attribute: userData.email,
            definitionUrl: 'http://',
            pin: userData.pin,
            identityAddress: wallet.getIdentityAddress()
          })
        })
        .then(txHash => {
          console.log('Add Email Hash' + txHash)
          return wallet.addAttributeHashToIdentity({
            attributeId: BASIC_ATTRIBUTES.BIRTHDAY,
            attribute: userData.birthday,
            definitionUrl: 'http://',
            pin: userData.pin,
            identityAddress: wallet.getIdentityAddress()
          })
        })
        .then(txHash => {
          console.log('Add Birthday Hash' + txHash)
        })
    })
}

export const loginIdentity = function ({commit}, params) {
  console.log('Login Action')
  console.log(params.seedPhrase)
  console.log('Password:' + params.password)
  identityService
    .loginWithSeedPhrase({
      seedPhrase: params.seedPhrase,
      pin: params.password,
      config: CONFIG
    })
    .catch((e) => {
      console.log('Login Error' + e)
      commit('loginError', true)
    })
    .then(_wallet => {
      wallet = _wallet
      let mainAddress = wallet.getMainAddress()
      console.log('MainAddress: ' + mainAddress)
      commit('setIdentityMainAdress', mainAddress)
      commit('setFirstTimeLogin', false)
      commit('setAuthenticationDone', true)
      commit('setLoggedIn', true)

      let identityAddress = wallet.getIdentityAddress()
      console.log('identityAddress =>' + identityAddress)
      commit('setIdentityAddress', identityAddress)

      console.log('Login Successfull')
      wallet.getBalances(mainAddress).then(balance => {
        commit('setBalance', balance)
      })
    })
}
export const setVerifyAttributeAction = function (
  {commit, dispatch, state},
  verifyAttribute
) {
  console.log('verify attribute')
  console.log(
    'selected identity address: ' + state.selectedIdentity.identityAddress
  )
  wallet
    .getAttributeHash({
      attributeId: verifyAttribute,
      identityAddress: state.selectedIdentity.identityAddress
    })
    .then(hash => {
      console.log('result->')
      console.log(hash)
      let verifyAttributeObj = {name: verifyAttribute, hash: hash}
      commit('setVerifyAttribute', verifyAttributeObj)
    })
}

export const addVerificationToContractAction = function (
  {commit, dispatch, state},
  params
) {
  console.log(state.selectedIdentity.identityAddress)
  console.log(state.verifyAttribute.name)
  console.log(params.pin)
  wallet
    .addVerificationToTargetIdentity({
      targetIdentityAddress: state.selectedIdentity.identityAddress,
      attributeId: state.verifyAttribute.name,
      pin: params.pin
    })
    .then(txHash => {
      commit('setWaiting', {txHash: txHash, text: 'waiting to be mined'})
      console.log('Transaction Hash (Add Verification): ' + txHash)
      dispatch('routerTo', 'waiting')
      return wallet.waitingToBeMined(txHash)
    })
    .then(result => {
      commit('setWaiting', {txHash: result.transactionHash, text: 'Successfull'})
      console.log('Transaction Hash (Add Verification) finished')
    })
}

export const setDialogStatus = ({commit}, params) => {
  commit('setDialogStatus', params)
}
