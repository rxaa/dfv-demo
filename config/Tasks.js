"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
const SqlBuilder_1 = require("dfv/src/db/SqlBuilder");
class Tasks {
    static startAll() {
        dfv_1.dfvFile.createTemp();
        Tasks.clearCache.start();
    }
}
/**
 * 每天3点清空所有表缓存
 */
Tasks.clearCache = dfv_1.dfvTime.dailyEvent(3, 0, e => {
    SqlBuilder_1.SqlBuilder.clearAllCache();
    dfv_1.dfvFile.clearTemp();
});
exports.Tasks = Tasks;
//# sourceMappingURL=Tasks.js.map