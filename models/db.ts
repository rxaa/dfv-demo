import {MysqlConnecter} from "dfv/src/db/MysqlConnecter";
import * as cfg from "../config/config";

export const db = {
    connecter: new MysqlConnecter(cfg.mysql),

}