import { dfv_user } from './../models/dfv_user';
import { dfv_file } from './../models/dfv_file';
import { RouteUser } from './RouteUser';
import { dfv } from 'dfv/src/public/dfv';
import { RouteController } from './RouteController';
import { dfvContext } from 'dfv/src/dfvContext';
import { db } from "../models/db";
import { SqlBuilder } from 'dfv/src/db/SqlBuilder';
import { DbAuth } from './RouteUser';
import { TestReq1 } from '../models/TestReq1';

/**
 * 前端数据库访问权限配置
 * 
 * 只能操作用户自己相关uid的数据
 */
const dfv_fileCfg = table(dfv_file, (db, dat) => db.and(f => f.uid.eq(dat.uid)));
const dfv_userCfg = table(dfv_user, (db, dat) => db.and(f => f.uid.eq(dat.uid)));

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
        select: [dfv_file, dfv_userCfg],
        update: [dfv_fileCfg],
        delete: [],
        insert: [dfv_file, dfv_user],
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


const dbType = ["select", "update", "delete", "insert"]

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
            let tableMap = {}
            it[type].forEach((table: DbAuth | Function) => {
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
export function checkDbAuth(ctx: dfvContext, type: "select" | "update" | "delete" | "insert", db: SqlBuilder<any>) {
    let user = RouteController.getUserInfo(ctx);
    if (!user) {
        throw dfv.err("没有登陆信息！");
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
        throw dfv.err("没有此操作权限！");
    }
}

function table<T>(name: { new(): T; }, func: (db: SqlBuilder<T>, dat: RouteUser) => any) {
    return {
        table: name,
        func: func,
    } as DbAuth;
}
