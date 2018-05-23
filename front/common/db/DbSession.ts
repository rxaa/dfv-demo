import { apiCRUD } from "./apiCRUD";
import { dfv } from "dfv/src/public/dfv";
import { DbField, DbFieldInfo } from "./DbField";
import { SelectFieldType, SelectOrderType } from "dfv/src/db/ISqlField";
import { SelectReq } from "../temp/SelectReq";


export class DbSession<TC> {


    _metaInfo: DbFieldInfo;
    _set: any[] = [];
    _fields: string[] = [];


    _reqList: SelectReq;

    private showProgress = true;

    constructor(public table: { new(): TC; }) {
        this.initMetaInfo();
        this._reqList = {
            table: this._metaInfo.tableName,
            id: "",
            id_name: "",
            where: [],
            count: 0,
            old: 0,
            second_id: null,
            second_name: "",
            num: 0,
            order: [],
            group: [],
            skip: 0,
            goto: 0,
        }
    }


    /**
     * 隐藏进度条
     * @returns {DbSession<TC>}
     */
    hideProgress() {
        this.showProgress = false;
        return this
    }

    initMetaInfo() {
        this._metaInfo = dfv.getData(this.table, "_DBFiledInfo", "") as DbFieldInfo;
        if (!this._metaInfo) {
            this._metaInfo = new DbFieldInfo(this.table);
            dfv.setData(this.table, "_DBFiledInfo", "", this._metaInfo);
        }
    }


    clear() {
        this._reqList.where.length = 0;
        this._reqList.order.length = 0;
        this._reqList.group.length = 0;
        this._set.length = 0;
        this._fields.length = 0;
    }

    private procDat(dat: any) {
        for (var k in dat) {
            var f = this._metaInfo.getField(k)
            if (f) {
                dat[k] = f.getValue(dat[k]);
            }
        }
    }

    insert(dat: TC | TC[]): Promise<number> {


        if (dat instanceof Array) {
            dat.forEach(it => this.procDat(it));
        }
        else if (dat) {
            this.procDat(dat)
        }

        return new Promise<number>((reso, reject) => {
            apiCRUD.selectInsert({ table: this._metaInfo.tableName, obj: dat })
                .showProgress(this.showProgress)
                .resp()
                .then(res => reso(res.res))
                .catch(err => reject(err))
        });
    }

    /**
     * 生成sql语句值列表
     * @param func 单参数lambda
     */
    protected makeFunc(func?: (f: TC) => any) {
        if (!func)
            return;

        this._fields.length = 0;

        var old = this._metaInfo.session;
        this._metaInfo.session = this;
        var ret = func(this._metaInfo.clasObj);
        if (ret) {
            if (ret instanceof DbField) {
                ret.toString();
            }
        }

        this._metaInfo.session = old;
    }

    /**
     * 重置where条件
     * @param func 条件lambda表达式
     * @returns {SqlBuilder}
     */
    where(func: (f: SelectFieldType<TC> & TC) => any) {
        this._reqList.where.length = 0;
        this.makeFunc(func);
        return this;
    }

    and(func: (f: SelectFieldType<TC> & TC) => any) {
        this.makeFunc(func);
        return this;
    }

    /**
     * limit
     * @param start 起始偏移位置,不传第二count参数则表示个数
     * @param count 个数
     * @returns {SqlBuilder}
     */
    limit(start: number, count?: number) {
        if (count == null) {
            this._reqList.num = start;
        }
        else {
            this._reqList.skip = start;
            this._reqList.num = count;
        }
        return this;
    }


    /**
     * 添加order by条件
     * @param func 字段表达式
     */
    order(func: (f: SelectOrderType<TC> & TC) => any) {
        this.makeFunc(func);
        return this;
    }

    set(func: (f: SelectFieldType<TC> & TC) => any) {
        this.makeFunc(func);
        return this;
    }

    update(func?: (f: SelectFieldType<TC> & TC) => any) {
        this.makeFunc(func);

        return new Promise<number>((reso, reject) => {
            apiCRUD.selectUpdateList({
                where: this._reqList.where,
                id: "",
                id_name: "",
                table: this._reqList.table,
                sets: this._set,
            })
                .showProgress(this.showProgress)
                .resp()
                .then(res => reso(res.res))
                .catch(err => reject(err))
        });
    }

    delete() {
        return new Promise<number>((reso, reject) => {
            apiCRUD.selectDelList({
                where: this._reqList.where,
                id_name: "",
                table: this._reqList.table,
                ids: [],
            })
                .showProgress(this.showProgress)
                .resp()
                .then(res => reso(res.res))
                .catch(err => reject(err))
        });
    }

    toArray(): Promise<TC[]> {
        return new Promise<TC[]>((reso, reject) => {
            apiCRUD.selectList(this._reqList)
                .showProgress(this.showProgress)
                .resp()
                .then(res => reso(res.list))
                .catch(err => reject(err))
        });
    }


    toOne(): Promise<TC | null> {
        return new Promise<TC | null>((reso, reject) => {
            apiCRUD.selectList(this._reqList)
                .showProgress(this.showProgress)
                .resp()
                .then(res => reso(res.list[0]))
                .catch(err => reject(err))
        });
    }
}