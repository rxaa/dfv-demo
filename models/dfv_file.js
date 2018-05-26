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
class dfv_file {
    constructor() {
        /**
         *
         */
        this.fid = 0;
        /**
         *
         */
        this.url = "";
        /**
         *
         */
        this.add_date = 0;
        /**
         *
         */
        this.md5 = "";
        /**
         *
         */
        this.name = "";
        this.uid = 0;
    }
}
__decorate([
    sql_1.sql.primaryKey,
    sql_1.sql.autoIncrement,
    __metadata("design:type", Number)
], dfv_file.prototype, "fid", void 0);
exports.dfv_file = dfv_file;
//# sourceMappingURL=dfv_file.js.map