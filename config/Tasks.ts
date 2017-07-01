import {dfvFile, dfvTime} from "dfv";
import {SqlBuilder} from "dfv/src/db/SqlBuilder";

export class Tasks {

    static startAll() {

        dfvFile.createTemp();

        Tasks.clearCache.start();

    }

    /**
     * 每天3点清空所有表缓存
     */
    static clearCache = dfvTime.dailyEvent(3, 0, e => {
        SqlBuilder.clearAllCache();
        dfvFile.clearTemp();
    });


}