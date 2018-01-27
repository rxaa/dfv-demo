"use strict";
exports.__esModule = true;
var dfv_1 = require("dfv/src/public/dfv");
/**
 * 储存对象至localStorage
 */
var ObjStorage = (function () {
    function ObjStorage(clas) {
        this.clas = clas;
        this._key = dfv_1.dfv.getFuncName(this.clas) + "_ObjStorage";
    }
    Object.defineProperty(ObjStorage.prototype, "dat", {
        get: function () {
            if (this._dat == null) {
                this.read();
            }
            return this._dat;
        },
        set: function (dat) {
            this._dat = dat;
        },
        enumerable: true,
        configurable: true
    });
    ObjStorage.prototype.save = function () {
        if (this._dat != null)
            localStorage[this._key] = JSON.stringify(this._dat);
    };
    ObjStorage.prototype.read = function () {
        var local = localStorage[this._key];
        if (local) {
            this._dat = JSON.parse(local);
            dfv_1.dfv.setPrototypeOf(this._dat, this.clas);
        }
        else {
            this._dat = new this.clas();
        }
    };
    ObjStorage._count = 0;
    return ObjStorage;
}());
exports.ObjStorage = ObjStorage;
