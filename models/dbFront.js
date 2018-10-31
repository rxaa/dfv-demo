"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_file_1 = require("./dfv_file");
const DbSession_1 = require("./../front/common/db/DbSession");
const dfv_user_1 = require("./dfv_user");
/**
 * 前端数据库操作，权限配置参照:/controllers/DbAuthController.ts
 */
exports.dbFront = {
    ////////////以下代码为自动生成,请勿修改//////////////
    /////////////auto generate start//////////////////
    dfv_file: () => new DbSession_1.DbSession(dfv_file_1.dfv_file),
    dfv_user: () => new DbSession_1.DbSession(dfv_user_1.dfv_user),
};
//# sourceMappingURL=dbFront.js.map