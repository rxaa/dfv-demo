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
const com_1 = require("./../lib/com");
const dfv_1 = require("dfv/src/public/dfv");
const valid_1 = require("dfv/src/public/valid");
class LoginReq {
    constructor() {
        this.id = "";
        /**
         * 密码的md5值
         */
        this.psw = "";
        /**
        * 是否记住密码
        */
        this.rember = 0;
    }
}
__decorate([
    valid_1.valid.stringNotEmpty(f => com_1.com.xss(f), "账号不能为空！"),
    __metadata("design:type", Object)
], LoginReq.prototype, "id", void 0);
__decorate([
    valid_1.valid.stringNotEmpty(f => com_1.com.xss(f), "密码不能为空！"),
    __metadata("design:type", Object)
], LoginReq.prototype, "psw", void 0);
exports.LoginReq = LoginReq;
class DelFileReq {
    constructor() {
        this.fids = dfv_1.arrayNumber();
    }
}
__decorate([
    valid_1.valid.array(f => f.val.length > 0 && f.val.eachToInt(), "文件id不能为空"),
    __metadata("design:type", Object)
], DelFileReq.prototype, "fids", void 0);
exports.DelFileReq = DelFileReq;
//# sourceMappingURL=ManaReq.js.map