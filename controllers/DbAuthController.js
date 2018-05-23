"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv/src/public/dfv");
const RouteController_1 = require("./RouteController");
const TestReq1_1 = require("../models/TestReq1");
/**
 * 前端数据库访问权限配置
 *
 * 只能操作用户自己相关的数据
 */
const TestReq1Cfg = table(TestReq1_1.TestReq1, (db, dat) => db.and(f => f.id.eq(dat.id)));
/**
 *
  * 权限：0.普通用户，1.录入员 2.管理员
  *
  */
exports.dbSelectCfg = [
    /**
     * 0.普通用户
     */
    {
        select: [TestReq1Cfg],
        update: [TestReq1Cfg],
        delete: [TestReq1Cfg],
        insert: [TestReq1_1.TestReq1],
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
    if (exports.dbSelectCfg["_isInit"])
        return;
    exports.dbSelectCfg["_isInit"] = true;
    exports.dbSelectCfg.forEach(it => {
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
    let allType = exports.dbSelectCfg[user.auth];
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