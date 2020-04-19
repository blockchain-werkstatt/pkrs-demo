import CONFIG from '../config'
import Vue from 'vue'
let plugin = {
  split (splitString, numberofshare, numberofcombine) {
    return new Promise((resolve, reject) => {
      let data = {
        inputString: splitString,
        share: numberofshare,
        combine: numberofcombine
      }
      Vue.http.post(CONFIG.secretSharingService + '/splitEncoded', data).then(
        response => {
          // get body data
          let result = response.body
          console.log('split reponse is')
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
  combine (data) {
    console.log('combine reponse is')
    return new Promise((resolve, reject) => {
      Vue.http.post(CONFIG.secretSharingService + '/combineEncoded', data).then(
        response => {
          // get body data
          let result = response.body
          console.log('combine reponse is')
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
  getQuestions () {
    return new Promise((resolve, reject) => {
      Vue.http.get(CONFIG.secretSharingService + '/questions').then(
        response => {
          let result = response.body
          console.log(result)
          resolve(result)
        },
        response => {
          console.log(response)
          reject(response)
        }
      )
    })
  },
  encodeString (seed) {
    return new Promise((resolve, reject) => {
      let data = {
        input: seed
      }
      Vue.http.post(CONFIG.secretSharingService + '/encode', data).then(
        response => {
          let result = response.data
          resolve(result)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  decodeString (string) {
    return new Promise((resolve, reject) => {
      let data = {
        input: string
      }
      Vue.http.post(CONFIG.secretSharingService + '/decode', data).then(
        response => {
          let result = response.data
          resolve(result)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  secureQnA (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(CONFIG.secretSharingService + '/splitQnA', data).then(
        response => {
          let result = response.data
          resolve(result)
        },
        response => {
          reject(response)
        }
      )
    })
  },
  recoverQnA (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(CONFIG.secretSharingService + '/combineQnA', data).then(
        response => {
          let result = response.data
          resolve(result)
        },
        response => {
          reject(response)
        }
      )
    })
  }
}

export default plugin
