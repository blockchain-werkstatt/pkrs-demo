var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ETHEREUM_ADDRESS: JSON.stringify(process.env.ETHEREUM_ADDRESS),
  FAUCET_ADDRESS: JSON.stringify(process.env.FAUCET_ADDRESS)
})
