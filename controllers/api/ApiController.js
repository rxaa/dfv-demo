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
const TestReq1_1 = require("../../models/TestReq1");
class ApiController {
    async test1(dat) {
        return dat;
    }
    async test2() {
        return "ok";
    }
}
__decorate([
    dfv_1.route.comment("接口名称", "接口简介", new TestReq1_1.TestReq1()),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TestReq1_1.TestReq1]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "test1", null);
__decorate([
    dfv_1.route.noAuth(),
    dfv_1.route.all(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "test2", null);
exports.ApiController = ApiController;
//# sourceMappingURL=ApiController.js.map