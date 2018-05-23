"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv/src/public/dfv");
class DbSql {
    /**
     * 设置class的验证字段
     * @param obj
     * @param key
     * @param func
     */
    static setFieldValueMetaData(obj, key, func) {
        dfv_1.dfv.setData(obj, "fieldValueMeta", key, func);
    }
    static getFieldValueMetaData(obj, key) {
        return dfv_1.dfv.getData(obj, "fieldValueMeta", key);
    }
    /**
     * 装饰DbSession中字段值的转换（如DateTime字段需要将number时间戳转为字符串）
     * @param {(val: any) => any} func
     * @return {(target: Object, propertyKey: string, index?: number) => any}
     */
    static value(func) {
        return (target, propertyKey, index) => {
            if (index !== void 0)
                propertyKey += index;
            DbSql.setFieldValueMetaData(target.constructor, propertyKey, func);
        };
    }
    static dateTimeValue() {
        return DbSql.value(val => dfv_1.dfv.dateToY_M_D_H_M_S(val));
    }
}
exports.DbSql = DbSql;
//# sourceMappingURL=DbSql.js.map