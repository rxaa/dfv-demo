import { DbSession } from './../front/common/db/DbSession';
import { TestReq1 } from './TestReq1';

/**
 * 前端数据库操作，权限配置参照:/controllers/DbAuthController.ts
 */
export const dbFront = {

    /**
     * 测试用例
     */
    TestReq1: () => new DbSession(TestReq1),

}