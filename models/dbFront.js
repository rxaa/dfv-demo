"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbSession_1 = require("./../front/common/db/DbSession");
const TestReq1_1 = require("./TestReq1");
/**
 * 前端数据库操作，权限配置参照:/controllers/DbAuthController.ts
 */
exports.dbFront = {
    /**
     * 测试用例
     */
    TestReq1: () => new DbSession_1.DbSession(TestReq1_1.TestReq1),
};
//# sourceMappingURL=dbFront.js.map