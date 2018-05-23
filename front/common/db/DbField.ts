import {dfv} from "dfv/src/public/dfv";
import {DbSession} from "./DbSession";
import {DbSql} from "./DbSql";

export class DbFieldInfo {
    tableName: string;
    clasObj: any;
    session: DbSession<any>;

    getField(key: string) {
        return this.clasObj[key] as DbField | null;
    }

    constructor(public table: { new(); }) {
        this.tableName = dfv.getFuncName(this.table);
        let obj = new table();
        this.clasObj = obj;
        for (let k in obj) {
            let f = obj[k];
            if (f instanceof Function)
                continue;

            obj[k] = new DbField(k, this, DbSql.getFieldValueMetaData(table, k));
        }
    }
}

export class DbField {

    constructor(public fieldName: string, public info: DbFieldInfo, public valFunc?: (val: any) => any) {

    }

    getValue(val: any) {
        if (this.valFunc)
            return this.valFunc(val);
        return val;
    }

    private addWhere(op: string, val: any) {
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


    eq(val: any) {
        this.addWhere("eq", val);
        return 1;
    }

    gt(val: any) {
        this.addWhere("gt", val);
        return 1;
    }

    le(val: any) {
        this.addWhere("le", val);
        return 1;
    }


    notEq(val: any) {
        this.addWhere("notEq", val);
        return 1;
    }

    leEq(val: any) {
        this.addWhere("leEq", val);
        return 1;
    }

    gtEq(val: any) {
        this.addWhere("gtEq", val);
        return 1;
    }

    in(val: any) {
        this.addWhere("in", val);
        return 1;
    }

    notIn(val: any) {
        this.addWhere("notIn", val);
        return 1;
    }

    like(val: any) {
        this.addWhere("like", val);
        return 1;
    }

    private addSet(op: string, val: any) {
        this.info.session._set.push(this.fieldName);
        this.info.session._set.push(op);
        this.info.session._set.push(this.getValue(val));
    }

    set(val: any) {
        this.addSet("set", val);
        return 1;
    }

    inc(val: any) {
        this.addSet("inc", val);
        return 1;
    }

    dec(val: any) {
        this.addSet("dec", val);
        return 1;
    }

    /**
     * 正序,用于order by
     */
    asc(): number {
        this.info.session._reqList.order.push(this.fieldName);
        this.info.session._reqList.order.push("asc");
        return 1;
    }

    /**
     * 倒序,用于order by
     */
    desc(): number {
        this.info.session._reqList.order.push(this.fieldName);
        this.info.session._reqList.order.push("desc");
        return 1;
    }
}