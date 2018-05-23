"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnecter_1 = require("dfv/src/db/MysqlConnecter");
const cfg = require("../config/config");
/**
 * 后端数据库操作
 */
exports.db = {
    connecter: new MysqlConnecter_1.MysqlConnecter(cfg.mysql),
};
//# sourceMappingURL=db.js.map