import CONFIG from '../config'
import Vue from 'vue'
let plugin = {
  askForEther (address) {
    return new Promise((resolve, reject) => {
      console.log('ask for ether faucet: ' + address)
      Vue.http.get(CONFIG.faucet + '/ether?address=' + address).then(
        response => {
          // get body data
          let result = response.body
          console.log('Ask For Ether Response')
          console.log(result)
          resolve(result)
        },
        response => {
          // error callback
          reject(response)
        }
      )
      return address
    })
  },
  uploadIPFS (file) {
    return new Promise((resolve, reject) => {
      let headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      Vue.http.post(CONFIG.faucet + '/ipfs', file, headers).then(
        response => {
          // get body data
          let result = response.body
          console.log('uploadIPFS Response')
          console.log(result)
          resolve(result)
        },
        response => {
          // error callback
          reject(response)
        }
      )
    })
  },
  retrieveIPFS (hash) {
    return new Promise((resolve, reject) => {
      Vue.http.get(CONFIG.faucet + '/ipfs/', hash).then(
        response => {
          // get body data
          let result = response.body
          console.log('retrieveIPFS Response')
          resolve(result)
        },
        response => {
          // error callback
          reject(response)
        }
      )
    })
  }
}

export default plugin
