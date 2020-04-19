"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var events_1 = require("events");
var EventNames;
(function (EventNames) {
    EventNames["released"] = "KEY_RELEASED";
})(EventNames || (EventNames = {}));
var KeyManager = /** @class */ (function (_super) {
    __extends(KeyManager, _super);
    function KeyManager(keys) {
        var _this = _super.call(this) || this;
        _this.keys = [];
        _this.busyKeys = [];
        _this.keys = keys;
        return _this;
    }
    KeyManager.prototype.getFreeKey = function () {
        var _this = this;
        var free = this.keys.find(function (k) { return _this.busyKeys.indexOf(k) < 0; });
        this.busyKeys.push(free);
        return free;
    };
    KeyManager.prototype.releaseKey = function (key) {
        this.busyKeys = this.busyKeys.filter(function (k) { return k !== key; });
        this.emit(EventNames.released, key);
    };
    KeyManager.prototype.getAllKeys = function () {
        return this.keys;
    };
    return KeyManager;
}(events_1.EventEmitter));
exports.KeyManager = KeyManager;
//# sourceMappingURL=keyManager.js.map