"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_user_1 = require("../models/dfv_user");
const ObjStorage_1 = require("./common/ObjStorage");
class ComData {
    static md5(str) {
        return md5(str);
    }
}
/**
* 储存登陆后的用户信息
* @type {any}
*/
ComData.user = new ObjStorage_1.ObjStorage(dfv_user_1.dfv_user);
exports.ComData = ComData;
//# sourceMappingURL=ComData.js.map