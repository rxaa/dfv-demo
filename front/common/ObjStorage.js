"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv/src/public/dfv");
/**
 * localStorage本地储存
 */
class ObjStorage {
    constructor(clas) {
        this.clas = clas;
        this._key = dfv_1.dfv.getFuncName(this.clas) + "_ObjStorage";
    }
    get dat() {
        if (this._dat == null) {
            this.read();
        }
        return this._dat;
    }
    set dat(dat) {
        this._dat = dat;
    }
    save() {
        if (this._dat != null)
            localStorage[this._key] = JSON.stringify(this._dat);
    }
    read() {
        let local = localStorage[this._key];
        if (local) {
            this._dat = JSON.parse(local);
            dfv_1.dfv.setPrototypeOf(this._dat, this.clas);
        }
        else {
            this._dat = new this.clas();
        }
    }
}
ObjStorage._count = 0;
exports.ObjStorage = ObjStorage;
//# sourceMappingURL=ObjStorage.js.map