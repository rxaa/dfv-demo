import {ClassMetaData, dfv} from "dfv/src/public/dfv";

export class DbSql {
    /**
     * 设置class的验证字段
     * @param obj
     * @param key
     * @param func
     */
    static setFieldValueMetaData(obj: ClassMetaData, key: string, func: (val: any) => any) {
        dfv.setData(obj, "fieldValueMeta", key, func);
    }

    static getFieldValueMetaData(obj: ClassMetaData, key: string) {
        return dfv.getData(obj, "fieldValueMeta", key) as (val: any) => any;
    }

    /**
     * 装饰DbSession中字段值的转换（如DateTime字段需要将number时间戳转为字符串）
     * @param {(val: any) => any} func
     * @return {(target: Object, propertyKey: string, index?: number) => any}
     */
    static value(func: (val: any) => any) {
        return (target: Object, propertyKey: string, index?: number) => {
            if (index !== void 0)
                propertyKey += index;
            DbSql.setFieldValueMetaData(target.constructor, propertyKey, func);
        }
    }


    static dateTimeValue() {
        return DbSql.value(val => dfv.dateToY_M_D_H_M_S(val));
    }
}