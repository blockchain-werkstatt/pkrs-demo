import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  identity: {
    seedPhrase: undefined,
    loggedIn: false,
    mainAddress: undefined,
    authenticationDone: false,
    firstTimeLogin: false, // identity needs to get his seed
    userHasSeedWrittenDown: false,
    loginError: false,
    balance: 0
  },
  userData: {
    firstName: 'Max',
    sureName: 'Mustermann',
    userName: 'max.mustermann',
    email: 'max.mustermann@fokus.fraunhofer.de',
    seedPhrase: '',
    pin: '',
    birthday: '01.01.1990',
    dataCloud: 'https://my-datacloud.fokus.fraunhofer.de',
    identityAddress: '0x'
  },
  verifyAttribute: {},
  selectedIdentity: {},
  waiting: {txHash: '0x', text: 'waiting to be mined'},
  identityList: [
    {
      userName: 'frauke.test',
      identityAddress: '0x74cf5d1300aa0d602009dd2b730345a7d5b05cbd',
      attributes: {
        public: [{email: 'frauke.test@fokus.fraunhofer.de', hash: '0x'}],
        private: [{id: '0x123', hash: '0x123'}, {id: '0x123', hash: '0x123'}]
      }
    },
    {
      userName: 'max.test',
      identityAddress: '0xfe7bd85cb484a0eab3cb6fb047012c504dea059e',
      attributes: {
        public: [{email: 'michael.alemu@fokus.fraunhofer.de'}],
        private: [{id: '0x123', hash: '0x123'}, {id: '0x123', hash: '0x123'}]
      }
    },
    {
      userName: 'lisa.test',
      identityAddress: '0x74bf9af8466be2d8a815c6196a3b1915cf126d9c',
      attributes: {
        public: [{email: 'susanna.kuber@fokus.fraunhofer.de'}],
        private: []
      }
    },
    {
      userName: 'mohammed.test',
      identityAddress: '0x4182ade819d469e60379caf4991aad17cc487fb8',
      attributes: {
        public: [{email: 'stefanie.hecht@fokus.fraunhofer.de'}],
        private: []
      }
    }
  ]
}
state._initialState = JSON.parse(JSON.stringify(state))

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept(['./getters', './actions', './mutations'], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
