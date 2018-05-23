"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv/src/public/dfv");
const DbSql_1 = require("./DbSql");
class DbFieldInfo {
    constructor(table) {
        this.table = table;
        this.tableName = dfv_1.dfv.getFuncName(this.table);
        let obj = new table();
        this.clasObj = obj;
        for (let k in obj) {
            let f = obj[k];
            if (f instanceof Function)
                continue;
            obj[k] = new DbField(k, this, DbSql_1.DbSql.getFieldValueMetaData(table, k));
        }
    }
    getField(key) {
        return this.clasObj[key];
    }
}
exports.DbFieldInfo = DbFieldInfo;
class DbField {
    constructor(fieldName, info, valFunc) {
        this.fieldName = fieldName;
        this.info = info;
        this.valFunc = valFunc;
    }
    getValue(val) {
        if (this.valFunc)
            return this.valFunc(val);
        return val;
    }
    addWhere(op, val) {
        this.info.session._reqList.where.push(this.fieldName);
        this.info.session._reqList.where.push(op);
        this.info.session._reqList.where.push(this.getValue(val));
    }
    toString() {
        this.info.session._fields.push(this.fieldName);
        return this.fieldName;
    }
    valueOf() {
        this.info.session._fields.push(this.fieldName);
        return this.fieldName;
    }
    eq(val) {
        this.addWhere("eq", val);
        return 1;
    }
    gt(val) {
        this.addWhere("gt", val);
        return 1;
    }
    le(val) {
        this.addWhere("le", val);
        return 1;
    }
    notEq(val) {
        this.addWhere("notEq", val);
        return 1;
    }
    leEq(val) {
        this.addWhere("leEq", val);
        return 1;
    }
    gtEq(val) {
        this.addWhere("gtEq", val);
        return 1;
    }
    in(val) {
        this.addWhere("in", val);
        return 1;
    }
    notIn(val) {
        this.addWhere("notIn", val);
        return 1;
    }
    like(val) {
        this.addWhere("like", val);
        return 1;
    }
    addSet(op, val) {
        this.info.session._set.push(this.fieldName);
        this.info.session._set.push(op);
        this.info.session._set.push(this.getValue(val));
    }
    set(val) {
        this.addSet("set", val);
        return 1;
    }
    inc(val) {
        this.addSet("inc", val);
        return 1;
    }
    dec(val) {
        this.addSet("dec", val);
        return 1;
    }
    /**
     * 正序,用于order by
     */
    asc() {
        this.info.session._reqList.order.push(this.fieldName);
        this.info.session._reqList.order.push("asc");
        return 1;
    }
    /**
     * 倒序,用于order by
     */
    desc() {
        this.info.session._reqList.order.push(this.fieldName);
        this.info.session._reqList.order.push("desc");
        return 1;
    }
}
exports.DbField = DbField;
//# sourceMappingURL=DbField.js.map