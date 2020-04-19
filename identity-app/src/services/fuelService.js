import CONFIG from '../config'
import Vue from 'vue'
let plugin = {
  askForEther (address) {
    return new Promise((resolve, reject) => {
      console.log('ask for ether: ' + address)
      Vue.http.get(CONFIG.etherFuel + '/request/' + address).then(
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
  }
}

export default plugin
