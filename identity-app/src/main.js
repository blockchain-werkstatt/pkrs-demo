// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VModal from 'vue-js-modal'

import VueMaterial from 'vue-material'
import VueCharts from 'vue-charts'
import 'vue-material/dist/vue-material.css'
import Resource from 'vue-resource'
import config from './config'
import Wallet from 'identity-contracts/lib/wallet'

let wallet = new Wallet(config)
console.log('wallet seed is : ' + wallet.generateRandomSeed())
console.log('ethereum address is : ' + config.gethHost)
console.log('faucet address is : ' + config.faucet)

Vue.use(Resource)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueCharts)

const NO_LOGIN_REQUIRED = ['/', '/create', '/generate', '/login', '/recoverseed', '/qnaRecovery']

router.beforeEach((to, from, next) => {
  console.log('Router: ' + to.path)
  console.log(store.state.identity.loggedIn)
  if (store.state.identity.loggedIn === false && NO_LOGIN_REQUIRED.includes(to.path) === false) {
    next('/')
  } else {
    next()
  }
})

// <img src="https://cdn.dribbble.com/users/310943/screenshots/3494035/stats-illo2.gif">
Vue.material.registerTheme({
  default: {
    primary: {
      color: 'green',
      hue: 700
    },
    accent: 'red'
  },
  teal: {
    primary: 'blue',
    accent: 'pink'
  },
  purple: {
    primary: 'purple',
    accent: 'orange'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
