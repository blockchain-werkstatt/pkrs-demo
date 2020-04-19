'use strict';

var _callback = require('../helper/callback');

var callback = _interopRequireWildcard(_callback);

var _secretkeysharing = require('secretkeysharing');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    /*
    * return array of questions available in the library
    */
    getQuestions(cb) {
        return _asyncToGenerator(function* () {
            yield callback.successCallback(_secretkeysharing.questions, cb);
        })();
    },

    splitQnA(secret, q, a, type, cb) {
        return _asyncToGenerator(function* () {
            /* 
            as per libary number of share should be atleast 3
            */
            if (q.count < 3 && a.count < 3) {
                let data = { 'error': 'Minimum Number of question and answer should be 3' };
                yield callback.errorCallback(data, cb);
            } else {
                const publicShare = (0, _secretkeysharing.split_qna)(secret, 3, q, a, type);
                yield callback.successCallback({ publicshare: publicShare }, cb);
            }
        })();
    },

    combineQnA(publicshare, q, a, type, cb) {
        return _asyncToGenerator(function* () {
            if (q.count < 3 && a.count < 3) {
                let data = { 'error': 'Minimum Number of question and answer should be 3' };
                yield callback.errorCallback(data, cb);
            } else {
                const secret = (0, _secretkeysharing.combine_qna)(publicshare, q, a, type);
                yield callback.successCallback({ secret: secret }, cb);
            }
        })();
    },

    split(input_key, numberofShare, numberofcombine, cb) {
        return _asyncToGenerator(function* () {
            /* 
            as per libary number of share should be atleast 3
            */
            if (numberofShare < 3) {
                let data = { 'error': 'Minimum Number of share should be 3' };
                yield callback.errorCallback(data, cb);
            } else

                /* 
                as per libary number of share should be atleast 3
                */
                if (numberofcombine < 3) {
                    let data = { 'error': 'Minimum Number of combination should be 3' };
                    yield callback.errorCallback(data, cb);
                } else {
                    const splits = (0, _secretkeysharing.split)(input_key, numberofShare, numberofcombine, _secretkeysharing.prime512);
                    yield callback.successCallback(splits, cb);
                }
        })();
    },

    splitEncoded(input_string, numberofShare, numberofcombine, cb) {
        return _asyncToGenerator(function* () {
            /* 
            as per libary number of share should be atleast 3
            */
            if (numberofShare < 3) {
                let data = { 'error': 'Minimum Number of share should be 3' };
                yield callback.errorCallback(data, cb);
            } else

                /* 
                as per libary number of share should be atleast 3
                */
                if (numberofcombine < 3) {
                    let data = { 'error': 'Minimum Number of combination should be 3' };
                    yield callback.errorCallback(data, cb);
                } else {
                    const splits = (0, _secretkeysharing.split)((0, _secretkeysharing.encode)(input_string), numberofShare, numberofcombine, _secretkeysharing.prime3217);
                    yield callback.successCallback(splits, cb);
                }
        })();
    },

    encoded(string, cb) {
        return _asyncToGenerator(function* () {
            yield callback.successCallback((0, _secretkeysharing.encode)(string), cb);
        })();
    },

    decoded(string, cb) {
        return _asyncToGenerator(function* () {
            yield callback.successCallback((0, _secretkeysharing.decode)(string), cb);
        })();
    },

    combine(share, cb) {
        return _asyncToGenerator(function* () {
            /*
            share structure should be 
            [
             {
                 "x": "1",
                 "y": "0x8b2954d1947407717a4bb4557cb59f71000c4f0355b0b838f06ad97ddf8ae9449c1ccfc5400f0296a9e62da1c43b1bb34e06331c8aecd7dea2b9df0a865857ec"
             },
             {
                 "x": "2",
                 "y": "0x4055f89d5123a389f9d7fc7e2c7e245b12cc425bed6c908debcb8416ff0965f89c87923601be5e29396708276c6be64beaf375521a6f8011b72ac9b0996c5d3b"
             },
             {
                 "x": "3",
                 "y": "0x1f85eb63360ed4497ea4d87a0f598ebe383fda09c73388fef221ffcb5e7b761c01404752450e12b7ae828f91bb6a2f5f3b24f9a10ffdb022c6561c6ec99de3e5"
             }
            ]
            */

            const combines = (0, _secretkeysharing.combine)(share, _secretkeysharing.prime512).toHex();
            yield callback.successCallback(combines, cb);
        })();
    },

    combineEncoded(share, cb) {
        return _asyncToGenerator(function* () {
            /*
            share structure should be 
            [
             {
                 "x": "1",
                 "y": "0x8b2954d1947407717a4bb4557cb59f71000c4f0355b0b838f06ad97ddf8ae9449c1ccfc5400f0296a9e62da1c43b1bb34e06331c8aecd7dea2b9df0a865857ec"
             },
             {
                 "x": "2",
                 "y": "0x4055f89d5123a389f9d7fc7e2c7e245b12cc425bed6c908debcb8416ff0965f89c87923601be5e29396708276c6be64beaf375521a6f8011b72ac9b0996c5d3b"
             },
             {
                 "x": "3",
                 "y": "0x1f85eb63360ed4497ea4d87a0f598ebe383fda09c73388fef221ffcb5e7b761c01404752450e12b7ae828f91bb6a2f5f3b24f9a10ffdb022c6561c6ec99de3e5"
             }
            ]
            */

            const combines = (0, _secretkeysharing.combine)(share, _secretkeysharing.prime3217).toHex();
            yield callback.successCallback((0, _secretkeysharing.decode)(combines), cb);
        })();
    }
};
//# sourceMappingURL=shamirController.js.map