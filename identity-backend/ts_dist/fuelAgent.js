"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var Transaction = require("ethereumjs-tx");
var config_1 = require("./config");
var keyManager_1 = require("./keyManager");
var Web3 = require("web3");
var fuelService = /** @class */ (function () {
    function fuelService() {
        /*
        configuration log to debug
        */
        console.log('config amount : ' + config_1.config.amount);
        console.log('config endpoint : ' + config_1.config.endpoint);
        console.log('config gasLimit : ' + config_1.config.gasLimit);
        console.log('config gasPrice : ' + config_1.config.gasPrice);
        console.log('config nrOfAddresses : ' + config_1.config.nrOfAddresses);
        console.log('config seedPhrase : ' + config_1.config.seedPhrase);
        console.log('config port : ' + config_1.config.port);
        /* ----  */
        var seedPhrase = config_1.config.seedPhrase, nrOfAddresses = config_1.config.nrOfAddresses;
        var keys = deriveKeys(seedPhrase, nrOfAddresses);
        this.web3 = new Web3(config_1.config.endpoint);
        this.keyManager = new keyManager_1.KeyManager(keys);
    }
    fuelService.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, keys, results, total;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = [];
                        if (!address) {
                            keys = this.keyManager.getAllKeys();
                            addresses.push.apply(addresses, keys.map(function (k) { return new ethers_1.Wallet(k).address; }));
                        }
                        else {
                            addresses.push(address);
                        }
                        return [4 /*yield*/, Promise.all(addresses.map((function (addr) { return _this.web3.eth.getBalance(addr); })))];
                    case 1:
                        results = _a.sent();
                        total = results.reduce(function (acc, curr) { return Number(acc) + Number(curr); });
                        return [2 /*return*/, this.web3.utils.fromWei(total.toString(), 'ether')];
                }
            });
        });
    };
    fuelService.prototype.sendEther = function (address, amount) {
        if (amount === void 0) { amount = config_1.config.amount; }
        return __awaiter(this, void 0, void 0, function () {
            var freeKey, w, currentNonce, toHex, tx, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        freeKey = this.keyManager.getFreeKey();
                        if (!freeKey) {
                            console.log('ERROR: All keys are busy');
                            throw new Error('All keys busy');
                        }
                        w = new ethers_1.Wallet(freeKey);
                        return [4 /*yield*/, this.web3.eth.getTransactionCount(w.address)];
                    case 1:
                        currentNonce = _a.sent();
                        toHex = this.web3.utils.toHex;
                        tx = new Transaction({
                            nonce: toHex(currentNonce),
                            value: toHex(amount),
                            gasLimit: toHex(config_1.config.gasLimit),
                            gasPrice: toHex(config_1.config.gasPrice),
                            to: address
                        });
                        tx.sign(Buffer.from(w.privateKey.substr(2), 'hex'));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.web3.eth.sendSignedTransaction("0x" + tx.serialize().toString('hex'))];
                    case 3:
                        _a.sent();
                        console.log("SUCCESS: " + w.address + " sent " + this.web3.utils.fromWei(amount.toString()) + " ETH to " + address);
                        this.keyManager.releaseKey(freeKey);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        console.log("ERROR: " + w.address + " failed to send " + this.web3.utils.fromWei(amount.toString()) + " ETH - " + err_1.message);
                        return [4 /*yield*/, this.sendEther(address, amount)];
                    case 5:
                        _a.sent();
                        this.keyManager.releaseKey(freeKey);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    fuelService.prototype.distribute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, addresses, txFeeInWei, txFeeInEth, toBeDistributed, _a, availableToSend, toSend, toSendInWei, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = this.keyManager.getAllKeys();
                        addresses = keys.map(function (k) { return new ethers_1.Wallet(k).address; });
                        txFeeInWei = 21e3 * 4e9;
                        txFeeInEth = Number(this.web3.utils.fromWei(txFeeInWei.toString()));
                        _a = Number;
                        return [4 /*yield*/, this.getBalance(addresses[0])];
                    case 1:
                        toBeDistributed = _a.apply(void 0, [_b.sent()]);
                        availableToSend = toBeDistributed - (txFeeInEth * (addresses.length - 1));
                        toSend = (availableToSend / (addresses.length));
                        toSendInWei = this.web3.utils.toWei(toSend.toString());
                        i = 1;
                        _b.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.sendEther(addresses[i], Math.floor(toSendInWei))];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return fuelService;
}());
exports.fuelService = fuelService;
var deriveKeys = function (mnemonic, nrOfKeysToDerive) {
    var results = [];
    for (var i = 0; i < nrOfKeysToDerive; i++) {
        results.push(ethers_1.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/" + i).privateKey);
    }
    return results;
};
//# sourceMappingURL=fuelAgent.js.map