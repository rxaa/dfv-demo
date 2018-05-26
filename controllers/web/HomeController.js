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
const dfv_1 = require("dfv/src/public/dfv");
const dfv_user_1 = require("./../../models/dfv_user");
const db_1 = require("./../../models/db");
const dfv_2 = require("dfv");
const viewHome_1 = require("../../views/viewHome");
const sys_1 = require("../../lib/sys");
let HomeController = class HomeController {
    /**
     * url为 /
     */
    async index() {
        //返回值作为response body
        return viewHome_1.viewHome.index();
    }
    async install() {
        await db_1.db.connecter.updatePromise(`CREATE TABLE dfv_file  (
            fid bigint(20) NOT NULL AUTO_INCREMENT,
            url varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            add_date bigint(20) NOT NULL DEFAULT 0,
            md5 varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            name varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            \`uid\` bigint(20) NOT NULL DEFAULT 0,
            PRIMARY KEY (fid) USING BTREE,
            INDEX add_date(add_date) USING BTREE
          ) ENGINE = InnoDB  CHARACTER SET = utf8;`);
        await db_1.db.connecter.updatePromise(` CREATE TABLE dfv_user  (
            uid int(10) NOT NULL AUTO_INCREMENT,
            id varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
            password varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码md5+salt',
            email varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            ip varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            auth int(10) NOT NULL DEFAULT 0 COMMENT '0.普通用户 1.编辑 2.管理员',
            login_time bigint(20) NOT NULL DEFAULT 0 COMMENT '登陆时间',
            token varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '访问令牌',
            salt varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            PRIMARY KEY (\`uid\`) USING BTREE,
            UNIQUE INDEX \`id\`(\`id\`) USING BTREE,
            INDEX \`login_time\`(\`login_time\`) USING BTREE
          ) ENGINE = InnoDB  CHARACTER SET = utf8 ;`);
        let u = new dfv_user_1.dfv_user();
        u.id = "admin";
        u.salt = dfv_1.dfv.getUniqueId16();
        u.password = sys_1.sys.hashPsw("admin", u.salt);
        u.login_time = Date.now();
        u.auth = 2;
        await db_1.db.dfv_user().insert(u);
        return `初始化完成！`;
    }
};
__decorate([
    dfv_2.route.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
__decorate([
    dfv_2.route.get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "install", null);
HomeController = __decorate([
    dfv_2.route.path("")
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map