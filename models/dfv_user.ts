
import { sql } from "dfv/src/public/sql";

export class dfv_user {


    /**
     * 
     */
    @sql.primaryKey
    @sql.autoIncrement
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
     * 登陆时间
     */
    login_time: number = 0;

    /**
     * 访问令牌
     */
    token: string = "";

    /**
     * 
     */
    salt: string = "";

}