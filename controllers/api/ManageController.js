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
const dfv_1 = require("dfv");
const ManaReq_1 = require("../../models/ManaReq");
const db_1 = require("../../models/db");
const dfv_2 = require("dfv/src/public/dfv");
const dfv_user_1 = require("../../models/dfv_user");
const sys_1 = require("../../lib/sys");
class ManageController {
    async login(dat) {
        let user = await db_1.db.dfv_user().where(f => f.id.eq(dat.id)).toOne();
        if (!user)
            throw dfv_2.dfv.err("用户不存在！");
        if (user.password != sys_1.sys.hashPsw2(dat.psw, user.salt))
            throw dfv_2.dfv.err("密码不正确");
        if (user.auth < 1)
            throw dfv_2.dfv.err("权限不足！");
        return user;
    }
}
__decorate([
    dfv_1.route.comment("后台登陆", "", new dfv_user_1.dfv_user()),
    dfv_1.route.noAuth(),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ManaReq_1.LoginReq]),
    __metadata("design:returntype", Promise)
], ManageController.prototype, "login", null);
exports.ManageController = ManageController;
//# sourceMappingURL=ManageController.js.map