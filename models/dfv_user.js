"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("dfv/src/public/sql");
class dfv_user {
    constructor() {
        /**
         *
         */
        this.uid = 0;
        /**
         * 账号
         */
        this.id = "";
        /**
         * 密码md5+salt
         */
        this.password = "";
        /**
         *
         */
        this.email = "";
        /**
         *
         */
        this.ip = "";
        /**
         * 0.普通用户 1.编辑 2.管理员
         */
        this.auth = 0;
        /**
         * 登陆时间
         */
        this.login_time = 0;
        /**
         * 访问令牌
         */
        this.token = "";
        /**
         *
         */
        this.salt = "";
    }
}
__decorate([
    sql_1.sql.primaryKey,
    sql_1.sql.autoIncrement,
    __metadata("design:type", Number)
], dfv_user.prototype, "uid", void 0);
exports.dfv_user = dfv_user;
//# sourceMappingURL=dfv_user.js.map