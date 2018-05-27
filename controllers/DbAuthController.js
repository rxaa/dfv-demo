"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_user_1 = require("./../models/dfv_user");
const dfv_file_1 = require("./../models/dfv_file");
const dfv_1 = require("dfv/src/public/dfv");
const RouteController_1 = require("./RouteController");
/**
 * 前端数据库访问权限配置
 *
 * 只能操作用户自己相关的数据
 */
const dfv_fileCfg = table(dfv_file_1.dfv_file, (db, dat) => db.and(f => f.uid.eq(dat.uid)));
const dfv_userCfg = table(dfv_user_1.dfv_user, (db, dat) => db.and(f => f.uid.eq(dat.uid)));
/**
 *
  * 权限：0.普通用户，1.录入员 2.管理员
  *
  */
const dbSelectCfg = [
    /**
     * 0.普通用户
     */
    {
        select: [dfv_file_1.dfv_file, dfv_userCfg],
        update: [dfv_fileCfg],
        delete: [],
        insert: [dfv_file_1.dfv_file, dfv_user_1.dfv_user],
    },
    /**
     * 1.录入员,允许全部权限
     */
    true,
    /**
     * 2.管理员,允许全部权限
     */
    true,
];
const dbType = ["select", "update", "delete", "insert"];
/**
 * 将权限数组初始化为map
 */
function init() {
    if (dbSelectCfg["_isInit"])
        return;
    dbSelectCfg["_isInit"] = true;
    dbSelectCfg.forEach(it => {
        if (it === true)
            return;
        dbType.forEach(type => {
            let tableMap = {};
            it[type].forEach((table) => {
                if (table instanceof Function) {
                    tableMap[table.name] = true;
                }
                else {
                    tableMap[table.table.name] = table.func;
                }
            });
            it[type] = tableMap;
        });
    });
}
/**
 *
 * @param ctx 检查操作权限
 * @param type
 * @param db
 */
function checkDbAuth(ctx, type, db) {
    let user = RouteController_1.RouteController.getUserInfo(ctx);
    if (!user) {
        throw dfv_1.dfv.err("没有登陆信息！");
    }
    init();
    let allType = dbSelectCfg[user.auth];
    if (allType === true)
        return;
    let table = allType[type][db.getTableName()];
    if (table instanceof Function) {
        table(db, user);
    }
    else if (table === true) {
        return;
    }
    else {
        throw dfv_1.dfv.err("没有此操作权限！");
    }
}
exports.checkDbAuth = checkDbAuth;
function table(name, func) {
    return {
        table: name,
        func: func,
    };
}
//# sourceMappingURL=DbAuthController.js.map