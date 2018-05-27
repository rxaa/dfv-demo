import { valid } from 'dfv/src/public/valid';

import { sql } from "dfv/src/public/sql";

export class dfv_user {

    static autoStr = ["普通用户", "编辑", "管理员"];
    static authNormal = 0;
    static authEditor = 1;
    static authAdmin = 2;

    /**
     * 
     */
    @sql.primaryKey
    @sql.autoIncrement
    @sql.cacheId
    uid: number = 0;

    /**
     * 账号
     */
    id: string = "";

    /**
     * 密码md5+salt
     */
    password: string = "";

    /**
     * 
     */
    email: string = "";

    /**
     * 
     */
    ip: string = "";

    /**
     * 0.普通用户 1.编辑 2.管理员
     */
    auth: number = 0;

    /**
     * 头像
     */
    img = 0;

    intro = "";

    /**
     * 登陆时间
     */
    login_time: number = Date.now();

    reg_time: number = Date.now();
    /**
     * 访问令牌
     */
    token: string = "";

    /**
     * 
     */
    salt: string = "";

    state = 0;

    /**
     * token生成时间
     */
    token_time = 0;
}