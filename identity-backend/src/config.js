const config = {
    port : process.env.PORT || '4000',
    seedPhrase: process.env.SEED_PHRASE || "route harbor drastic pigeon asset circle vintage robust catalog vendor okay vault",
    endpoint: process.env.ETHEREUM_ADDRESS || 'http://localhost:8545',
    gasLimit: process.env.GAS_LIMIT || 6721975,
    gasPrice: process.env.GAS_PRICE || 20000000000,
    amount: process.env.AMOUNT || 650000000000000000,
    nrOfAddresses: parseInt(process.env.NO_OF_ADDRESSES) || 10
}

export default config;