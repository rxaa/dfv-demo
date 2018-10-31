import { MysqlConnecter } from "dfv/src/db/MysqlConnecter";
import * as cfg from "../config/config";
import { SqlBuilder } from "dfv/src/db/SqlBuilder";
import { dfv_file } from "./dfv_file";
import { dfv_user } from "./dfv_user";

/**
 * 后端数据库操作
 */
export const db = {
    connecter: new MysqlConnecter(cfg.mysql),

    ////////////以下代码为自动生成,请勿修改//////////////
    /////////////auto generate start//////////////////


    /**
     *
     */
    dfv_file: () => new SqlBuilder(dfv_file, db.connecter),

    /**
     *
     */
    dfv_user: () => new SqlBuilder(dfv_user, db.connecter),
    /////////////auto generate end///////////////////
}
