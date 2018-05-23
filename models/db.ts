import { MysqlConnecter } from "dfv/src/db/MysqlConnecter";
import * as cfg from "../config/config";

/**
 * 后端数据库操作
 */
export const db = {
    connecter: new MysqlConnecter(cfg.mysql),

}