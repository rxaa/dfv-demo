import { SqlBuilder } from "dfv/src/db/SqlBuilder";

/**
 * 登陆后的用户信息
 */
export class RouteUser {
    /**
    * 用户id
    */
    uid: number = 0;

    /**
     * 用户名
     */
    name: string = "";

    /**
     * 权限：0普通，1.录入员 2.管理员
     */
    auth: number = 0;
}

/**
 * 数据库权限验证
 */
export interface DbAuth {
    table: Function,
    func: (db: SqlBuilder<any>, dat: RouteUser) => any,
}