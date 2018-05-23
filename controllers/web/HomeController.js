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
const viewHome_1 = require("../../views/viewHome");
let HomeController = class HomeController {
    /**
     * url为 /
     */
    async index() {
        //返回值作为response body
        return viewHome_1.viewHome.index();
    }
};
__decorate([
    dfv_1.route.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
HomeController = __decorate([
    dfv_1.route.path("")
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map