import { dfv_file } from './dfv_file';
import { DbSession } from './../front/common/db/DbSession';
import { dfv_user } from './dfv_user';

/**
 * 前端数据库操作，权限配置参照:/controllers/DbAuthController.ts
 */
export const dbFront = {

    ////////////以下代码为自动生成,请勿修改//////////////
    /////////////auto generate start//////////////////


    /**
     *
     */
    dfv_file: () => new DbSession(dfv_file),

    /**
     *
     */
    dfv_user: () => new DbSession(dfv_user),
    /////////////auto generate end///////////////////
}
