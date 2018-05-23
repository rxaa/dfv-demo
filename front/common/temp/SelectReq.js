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
const valid_1 = require("dfv/src/public/valid");
const dfv_1 = require("dfv/src/public/dfv");
class SelectCountReq {
    constructor() {
        /**
         * 表名
         */
        this.table = "";
        /**
         * limit数量
         */
        this.num = 0;
        /**
         * skip位置
         */
        this.skip = 0;
        /**
         * 查询条件，三目操作
         */
        this.where = Array();
        /**
         * 排序条件，双目操作
         */
        this.order = dfv_1.arrayString();
        /**
         * 分组条件，单目操作
         */
        this.group = Array();
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(),
    __metadata("design:type", Object)
], SelectCountReq.prototype, "table", void 0);
__decorate([
    valid_1.valid.int(r => r.val >= 0 && r.val < 1000, "num 0-1000以内"),
    __metadata("design:type", Object)
], SelectCountReq.prototype, "num", void 0);
__decorate([
    valid_1.valid.array(r => r.val.length >= 0),
    __metadata("design:type", Object)
], SelectCountReq.prototype, "where", void 0);
exports.SelectCountReq = SelectCountReq;
class SelectReq {
    constructor() {
        /**
         * 表名
         */
        this.table = "";
        /**
         * limit数量
         */
        this.num = 0;
        /**
         * skip位置
         */
        this.skip = 0;
        /**
         * 主键id名
         */
        this.id_name = "";
        /**
         * 主键id(可选,刷新传最大id,加载旧数据传最小id)
         */
        this.id = "";
        /**
         * 次要排序字段
         */
        this.second_name = "";
        this.second_id = null;
        /**
         * 是否加载旧数据
         */
        this.old = 0;
        /**
         * 查询条件，三目操作
         */
        this.where = Array();
        /**
         * 是否返回总条目数
         */
        this.count = 0;
        /**
         * 排序条件，双目操作
         */
        this.order = dfv_1.arrayString();
        /**
         * 分组条件，单目操作
         */
        this.group = Array();
        /**
         * 跳页
         */
        this.goto = 0;
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(),
    __metadata("design:type", Object)
], SelectReq.prototype, "table", void 0);
__decorate([
    valid_1.valid.int(r => r.val >= 0 && r.val < 1000, "num 0-1000以内"),
    __metadata("design:type", Object)
], SelectReq.prototype, "num", void 0);
__decorate([
    valid_1.valid.array(r => r.val.length >= 0),
    __metadata("design:type", Object)
], SelectReq.prototype, "where", void 0);
exports.SelectReq = SelectReq;
class SelectDelReq {
    constructor() {
        /**
         * 表名
         */
        this.table = "";
        /**
         * 主键id名
         */
        this.id_name = "";
        /**
         * 主键id(可选,刷新传最大id,加载旧数据传最小id)
         */
        this.ids = dfv_1.arrayString();
        /**
         * 查询条件，三目操作
         */
        this.where = Array();
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(),
    __metadata("design:type", Object)
], SelectDelReq.prototype, "table", void 0);
__decorate([
    valid_1.valid.array(r => r.val.eachToString()),
    __metadata("design:type", Object)
], SelectDelReq.prototype, "ids", void 0);
__decorate([
    valid_1.valid.array(r => r.val.length >= 0),
    __metadata("design:type", Object)
], SelectDelReq.prototype, "where", void 0);
exports.SelectDelReq = SelectDelReq;
class SelectInsertReq {
    constructor() {
        /**
         * 表名
         */
        this.table = "";
        /**
         * 插入的对象
         * @type {any}
         */
        this.obj = null;
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(),
    __metadata("design:type", Object)
], SelectInsertReq.prototype, "table", void 0);
exports.SelectInsertReq = SelectInsertReq;
class SelectUpdateReq {
    constructor() {
        /**
         * 表名
         */
        this.table = "";
        /**
         * 主键id名
         */
        this.id_name = "";
        /**
         * 主键id(可选,刷新传最大id,加载旧数据传最小id)
         */
        this.id = "";
        /**
         * 查询条件，三目操作
         */
        this.where = Array();
        /**
         * sets条件 三目条件
         */
        this.sets = Array();
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(),
    __metadata("design:type", Object)
], SelectUpdateReq.prototype, "table", void 0);
__decorate([
    valid_1.valid.array(r => r.val.length >= 0),
    __metadata("design:type", Object)
], SelectUpdateReq.prototype, "where", void 0);
__decorate([
    valid_1.valid.array(r => r.val.length >= 0),
    __metadata("design:type", Object)
], SelectUpdateReq.prototype, "sets", void 0);
exports.SelectUpdateReq = SelectUpdateReq;
class UploadRes {
    constructor() {
        this.fid = 0;
        this.url = "";
    }
}
exports.UploadRes = UploadRes;
//# sourceMappingURL=SelectReq.js.map