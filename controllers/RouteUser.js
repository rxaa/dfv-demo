"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登陆后的用户信息
 */
class RouteUser {
    constructor() {
        /**
        * 用户id
        */
        this.uid = 0;
        /**
         * 用户名
         */
        this.name = "";
        /**
         * 权限：0普通，1.录入员 2.管理员
         */
        this.auth = 0;
    }
}
exports.RouteUser = RouteUser;
//# sourceMappingURL=RouteUser.js.map