'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestEther = exports.wallet = undefined;

var _wallet = require('identity-contracts/lib/wallet');

var _wallet2 = _interopRequireDefault(_wallet);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG = {
    debug: true,
    logger: undefined,
    lookupContractAddress: '0x',
    gethHost: _config2.default.endpoint

    //only for testing purpose
};const TEST_PIN = "1234";
const TEST_SEED_PHRASE = "mandate print cereal style toilet hole cave mom heavy fork network indoor";
const TEST_ETHER_AMOUNT = 0.5;

const wallet = exports.wallet = new _wallet2.default(CONFIG);

let mainAddress;

wallet.init({ seedPhrase: TEST_SEED_PHRASE, pin: TEST_PIN }).then(_mainAddress => {
    wallet.getBalance(_mainAddress).then(() => {
        //check the minimum required balance
        _request2.default.get('http://localhost:' + _config2.default.port + '/fuel/request/' + _mainAddress).on('response', response => {
            // eslint-disable-next-line no-console
            console.log('response is :' + JSON.stringify(response));
            mainAddress = _mainAddress;
        });
    });
}).catch(() => {});

const requestEther = (address, callback) => {

    let txHash;

    _request2.default.get('http://localhost:' + _config2.default.port + '/fuel/request/' + mainAddress).on('response', response => {

        if (response.statusCode == 200) {
            wallet.sendEther({ receiver: address, amountEther: TEST_ETHER_AMOUNT, data: null, pin: TEST_PIN }).then(result => {
                txHash = result;
                return wallet.getBalances(address);
            }).then(balance => {
                // eslint-disable-next-line no-console
                console.log("balance:" + balance);
                callback({ success: "transaction send", txHash: txHash });
            });
        } else {
            callback('not able to fuel right now , Keys are busy try again');
        }
    });
};

exports.requestEther = requestEther;
//# sourceMappingURL=faucetController.js.map