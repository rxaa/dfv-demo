"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnecter_1 = require("dfv/src/db/MysqlConnecter");
const cfg = require("../config/config");
const SqlBuilder_1 = require("dfv/src/db/SqlBuilder");
const dfv_file_1 = require("./dfv_file");
const dfv_user_1 = require("./dfv_user");
/**
 * 后端数据库操作
 */
exports.db = {
    connecter: new MysqlConnecter_1.MysqlConnecter(cfg.mysql),
    ////////////以下代码为自动生成,请勿修改//////////////
    /////////////auto generate start//////////////////
    dfv_file: () => new SqlBuilder_1.SqlBuilder(dfv_file_1.dfv_file, exports.db.connecter),
    dfv_user: () => new SqlBuilder_1.SqlBuilder(dfv_user_1.dfv_user, exports.db.connecter),
};
//# sourceMappingURL=db.js.map