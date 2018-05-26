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
const com_1 = require("./../../lib/com");
const dfv_1 = require("dfv");
const SelectReq_1 = require("../../front/common/temp/SelectReq");
const db_1 = require("../../models/db");
const dfv_2 = require("dfv/src/public/dfv");
const ListResp_1 = require("../../front/common/temp/ListResp");
const Page_1 = require("../../lib/Page");
const DbAuthController_1 = require("../DbAuthController");
/**
 * 用于前端直接访问数据库,访问权限参照/../DbAuthController.ts文件
 */
class SelectController {
    async del(dat) {
        let s = db_1.db[dat.table];
        if (!s) {
            throw dfv_2.dfv.err("无此表");
        }
        DbAuthController_1.checkDbAuth(this.ctx, "delete", s);
        // if (mysqlModel.cacheTableMap[dat.table]) {
        //     s.cacheRemoveAll()
        // }
        if (dat.where.length > 0) {
            //where条件
            for (let i = 0; i < dat.where.length; i += 3) {
                let w0 = dat.where[i];
                let w1 = dat.where[i + 1];
                let w2 = dat.where[i + 2];
                s.and(f => f[w0][w1].call(f[w0], w2));
            }
        }
        else {
            s.where(f => (f[dat.id_name]).in(dat.ids));
        }
        let res = await s.delete();
        s.cacheRemoveAll();
        return { res: res };
    }
    async insert(dat) {
        let s = db_1.db[dat.table];
        if (!s) {
            throw dfv_2.dfv.err("无此表");
        }
        if (dat.obj == null) {
            throw dfv_2.dfv.err("添加内容不能为空");
        }
        DbAuthController_1.checkDbAuth(this.ctx, "insert", s);
        if (dat.obj instanceof Array) {
            dat.obj.forEach(it => {
                com_1.com.xssObject(it);
            });
        }
        else {
            com_1.com.xssObject(dat.obj);
        }
        let res = await s.insert(dat.obj);
        return { res: res };
    }
    async update(dat) {
        let s = db_1.db[dat.table];
        if (!s) {
            throw dfv_2.dfv.err("无此表");
        }
        if (dat.sets.length % 3 > 0) {
            throw dfv_2.dfv.err("sets条件错误");
        }
        DbAuthController_1.checkDbAuth(this.ctx, "update", s);
        if (dat.where.length > 0) {
            //where条件
            for (let i = 0; i < dat.where.length; i += 3) {
                let w0 = dat.where[i];
                let w1 = dat.where[i + 1];
                let w2 = dat.where[i + 2];
                s.and(f => f[w0][w1].call(f[w0], w2));
            }
        }
        else {
            s.where(f => (f[dat.id_name]).eq(dat.id));
        }
        //where条件
        for (let i = 0; i < dat.sets.length; i += 3) {
            let w0 = dat.sets[i];
            let op = dat.sets[i + 1];
            let w1 = dat.sets[i + 2];
            if (typeof w1 === "string") {
                w1 = com_1.com.xssStr(w1);
            }
            s.set(f => f[w0][op](w1));
        }
        let res = await s.update();
        s.cacheRemoveAll();
        return { res: res };
    }
    async count(dat) {
        let s = db_1.db[dat.table];
        if (!s) {
            throw dfv_2.dfv.err("无此表");
        }
        if (dat.where.length % 3 > 0) {
            throw dfv_2.dfv.err("条件错误");
        }
        if (dat.order.length % 2 > 0) {
            throw dfv_2.dfv.err("order条件错误");
        }
        //where条件
        for (let i = 0; i < dat.where.length; i += 3) {
            let w0 = dat.where[i];
            let w1 = dat.where[i + 1];
            let w2 = dat.where[i + 2];
            s.and(f => f[w0][w1].call(f[w0], w2));
        }
        if (dat.num > 0)
            s.limit(dat.skip, dat.num);
        for (let i = 0; i < dat.order.length; i += 2) {
            s.order(f => f[dat.order[i]][dat.order[i + 1]]());
        }
        let res = await s.count();
        return { res: res };
    }
    async list(dat) {
        let s = db_1.db[dat.table];
        if (!s) {
            throw dfv_2.dfv.err("无此表");
        }
        if (dat.where.length % 3 > 0) {
            throw dfv_2.dfv.err("条件错误");
        }
        if (dat.order.length % 2 > 0) {
            throw dfv_2.dfv.err("order条件错误");
        }
        DbAuthController_1.checkDbAuth(this.ctx, "select", s);
        //where条件
        for (let i = 0; i < dat.where.length; i += 3) {
            let w0 = dat.where[i];
            let w1 = dat.where[i + 1];
            let w2 = dat.where[i + 2];
            s.and(f => f[w0][w1].call(f[w0], w2));
        }
        let res = new ListResp_1.ListResp();
        //总条目数
        if (dat.count > 0) {
            res.count = await s.count();
        }
        else {
            delete res.count;
        }
        if (dat.goto > 0) {
            if (dat.old) {
                s.limit((dat.goto - 1) * dat.num, dat.num);
                if (dat.second_name.length > 0)
                    s.order(s => s[dat.second_name].asc() + s[dat.id_name].asc());
                else
                    s.order(s => s[dat.id_name].asc());
            }
            else {
                s.limit((dat.goto - 1) * dat.num, dat.num);
                if (dat.second_name.length > 0)
                    s.order(s => s[dat.second_name].desc() + s[dat.id_name].desc());
                else
                    s.order(s => s[dat.id_name].desc());
            }
        }
        else {
            //分页
            if (dat.second_name.length > 0) {
                Page_1.Page.pageIng(dat.old, dat.id, s, s => s[dat.id_name], dat.second_id, s => s[dat.second_name]);
            }
            else if (dat.id_name.length > 0) {
                Page_1.Page.pageIng(dat.old, dat.id, s, s => s[dat.id_name]);
            }
            if (dat.num > 0)
                s.limit(dat.skip, dat.num);
        }
        for (let i = 0; i < dat.order.length; i += 2) {
            s.order(f => f[dat.order[i]][dat.order[i + 1]]());
        }
        res.list = await s.toArray();
        return res;
    }
}
__decorate([
    dfv_1.route.comment("通用删除接口", "", {}),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SelectReq_1.SelectDelReq]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "del", null);
__decorate([
    dfv_1.route.comment("通用插入接口", "", {}),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SelectReq_1.SelectInsertReq]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "insert", null);
__decorate([
    dfv_1.route.comment("通用更新接口", "", {}),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SelectReq_1.SelectUpdateReq]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "update", null);
__decorate([
    dfv_1.route.comment("通用列表count接口", "", {}),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SelectReq_1.SelectCountReq]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "count", null);
__decorate([
    dfv_1.route.comment("通用列表查询接口", "", new ListResp_1.ListResp),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SelectReq_1.SelectReq]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "list", null);
exports.SelectController = SelectController;
//# sourceMappingURL=SelectController.js.map