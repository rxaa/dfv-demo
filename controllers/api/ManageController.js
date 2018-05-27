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
const FileController_1 = require("./FileController");
const dfv_1 = require("dfv");
const ManaReq_1 = require("../../models/ManaReq");
const db_1 = require("../../models/db");
const dfv_2 = require("dfv/src/public/dfv");
const dfv_user_1 = require("../../models/dfv_user");
const sys_1 = require("../../lib/sys");
const RouteController_1 = require("../RouteController");
class ManageController {
    async login(dat) {
        let user = await db_1.db.dfv_user().where(f => f.id.eq(dat.id)).toOne();
        if (!user)
            throw dfv_2.dfv.err("用户不存在！");
        if (user.password != sys_1.sys.hashPsw2(dat.psw, user.salt))
            throw dfv_2.dfv.err("密码不正确");
        if (user.auth <= dfv_user_1.dfv_user.authNormal)
            throw dfv_2.dfv.err("权限不足！");
        /**
         * 重新登陆，token有效期3小时
         */
        if (user.token == "" || Date.now() - user.token_time > 3 * 60 * 60 * 1000) {
            user.token = dfv_2.dfv.getUniqueId16();
            user.token_time = Date.now();
        }
        user.login_time = Date.now();
        user.ip = sys_1.sys.getRealIp(this.ctx);
        await db_1.db.dfv_user().updateById(user);
        db_1.db.dfv_user().cacheRemove(user.uid);
        delete user.password;
        delete user.salt;
        return user;
    }
    async del_file(dat) {
        this.checkUserAuth();
        let s = db_1.db.dfv_file().where(f => f.fid.in(dat.fids));
        let list = await s.toArray();
        list.forEach(it => dfv_1.dfvFile.unlink(FileController_1.FileController.fileMenu() + it.url));
        await s.delete();
        return {};
    }
    /**
     * 检查权限
     */
    checkUserAuth() {
        let user = RouteController_1.RouteController.getUserInfo(this.ctx);
        if (!user)
            throw dfv_2.dfv.err("没有登录信息！");
        if (user.auth <= dfv_user_1.dfv_user.authNormal)
            throw dfv_2.dfv.err("权限不足！");
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
__decorate([
    dfv_1.route.comment("删除文件", "", {}),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ManaReq_1.DelFileReq]),
    __metadata("design:returntype", Promise)
], ManageController.prototype, "del_file", null);
exports.ManageController = ManageController;
//# sourceMappingURL=ManageController.js.map