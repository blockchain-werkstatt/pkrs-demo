// ---
export const setInitialState = state => {
  let initialState = state._initialState
  console.log('SET INITAL STATE')
  for (var key in state) {
    // skip loop if the property is from prototype
    if (!state.hasOwnProperty(key)) continue

    state[key] = initialState[key]
  }
}

export const setDialogStatus = (state, params) => {
  console.log('set dialog status')
  state.dialogs[params.dialogName].status = params.status
}

export const setSelectedIdentity = (state, selectedIdentity) => {
  state.selectedIdentity = selectedIdentity
}

export const setBalance = (state, balance) => {
  state.identity.balance = balance
}
export const setVerifyAttribute = (state, verifyAttribute) => {
  state.verifyAttribute = verifyAttribute
}
export const setWaiting = (state, waiting) => {
  state.waiting = waiting
}
export const setIdentityAddress = (state, identityAddress) => {
  state.userData.identityAddress = identityAddress
}
export const loginError = (state, loginError) => {
  state.identity.loginError = true
}
export const setUserData = (state, userData) => {
  state.userData = userData
}

export const setIdentitySeedPhrase = (state, seedPhrase) => {
  state.identity.seedPhrase = seedPhrase
}
export const setLoggedIn = (state, loggedIn) => {
  state.identity.loggedIn = loggedIn
}

export const setAuthenticationDone = (state, authenticationDone) => {
  state.identity.authenticationDone = authenticationDone
}

export const setIdentityMainAdress = (state, mainAddress) => {
  state.identity.mainAddress = mainAddress
}

export const setFirstTimeLogin = (state, firstTimeLogin) => {
  state.identity.firstTimeLogin = firstTimeLogin
}

export const setUserHasSeedWrittenDown = (state, userHasSeedWrittenDown) => {
  state.identity.userHasSeedWrittenDown = userHasSeedWrittenDown
}
