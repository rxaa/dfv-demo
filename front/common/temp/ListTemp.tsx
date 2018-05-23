import * as React from "dfv/src/public/dfvReact";
import { ListResp } from "./ListResp";
import { ListTempView } from "./ListTempView";
import { apiCRUD } from '../db/apiCRUD';
import { TempTextEdit } from './TempTextEdit';
import { arrayString, dfv, MapString } from "dfv/src/public/dfv";
import { valid } from "dfv/src/public/valid";
import { dfvFront, InputType, LocalName } from "dfv/src/public/dfvFront";
import { dfvWindow } from "dfv/src/public/dfvWindow";
import { DbSession } from "../db/DbSession";


/**
 * 新建list模板
 * @param tableName 显示的表或视图
 * @param title 名称
 * @param insertTable 需要insert数据的表
 * @returns {ListTemp<T, T2>}
 */
export function newListTemp<T, T2>(tableName: { new(): T }, title: string, insertTable: { new(): T2 }): ListTemp<T, T2> {
    return new ListTemp(tableName, title, insertTable);
}


type PartialType<T, T2> = {
    [p in keyof T]?: T2
};


type ListItemFunc<T, RET> = (dat: T, index: number) => RET;
type ListItemFuncDom<T, RET> = (dat: T, index: number, dom: HTMLElement) => RET;

export interface IListEditData<T> {
    dat: T;
    field: string;
    index: number;

    /**
     * dat中的原始值
     */
    value: string | number;

    /**
     * 经过字段显示函数后的值
     */
    funcValue: string;

    /**
     * 当dom设置为null不做任何显示
     */
    dom: HTMLElement | null;
    /**
     * 是否为全部属性编辑
     */
    isEditAll: boolean;

    /**
     * 是否为添加界面
     */
    isAdd: boolean;
}

export interface IListEdit<T> {
    onShow(e: IListEditData<T>): void | Promise<void>;

    onValid(e: IListEditData<T>): boolean | Promise<boolean>;
}

/**
 * 分页列表模板
 */
export class ListTemp<T, T2> {

    constructor(public tableName: { new(): T }, public title: string, public insertTable: { new(): T2 }) {

    }

    uniqueId = dfv.getUniqueId16();

    /**
     * 是否按倒序排列
     * @type {boolean}
     */
    private orderDesc = true;

    /**
     * 改为正序显示
     * @param desc
     */
    setOrderAsc() {
        this.orderDesc = false;
        this.req.old = 1;
    }


    /**
     * 开启list item选择模式，否则为批量删除
     * @type {boolean}
     */
    selectMode = false;

    /**
     * 开启多选
     * @type {boolean}
     */
    mutiSelect = false;


    /**
     * ajax接口入参
     */
    req = {
        /**
         * 是否计算总条目数
         */
        count: 1,
        /**
         * 是否加载旧内容
         */
        old: 0,
        //页码跳转
        goto: 0,

        /**
         *最后一次操作分页的数据对象
         */
        currentObj: null as T | null,
    }

    /**
     * 界面上动态绑定的内容
     */
    dat = valid.bindAble({
        /**
         * 总条目数
         */
        count: 0,

        //日期from
        dateFrom: "",

        //日期to
        dateTo: "",

        //搜索内容
        name: "",

        /**
         * 当前页
         */
        currentPage: 1,
        /**
         * 总页数
         */
        totalPage: 1,

        // 全选
        checkAll: false,
    });

    /**
     * 主键id
     * @type {string}
     */
    primaryKeyName = "";
    /**
     * 次键，次要排序字段如时间
     */
    secondKeyName = "";

    /**
     * 数据库操作
     * @type {DbSession<T>}
     */
    db = new DbSession(this.tableName);


    /**
     * 设置主键与次键（先按次键排序，重复再按主键排序）
     * @param pk
     * @param secondKey
     */
    setPrimaryKey(pk: Partial<T>, secondKey?: Partial<T>) {
        for (let k in pk) {
            this.primaryKeyName = k;
        }

        if (secondKey) {
            for (let k in secondKey) {
                this.secondKeyName = k;
            }
        }
    }


    cfg = {
        /**
         * 显示用字段名列表(key值)
         */
        showFieldList: arrayString(),
        /**
         * 字段key->中文名
         */
        showFieldMap: {} as MapString<string>,
        /**
         * 字段的显示函数
         */
        showFunc: {} as MapString<(f: string | number, dat: T, index: number) => string | number>,

        /**
         * 自定义字段:[显示回调，点击回调]
         */
        customFieldMap: {} as MapString<[ListItemFunc<T, string>, ListItemFuncDom<T, void | Promise<void>>]>,
        customFieldList: arrayString(),

        editFiledMap: {} as MapString<IListEdit<T>>,
        addFieldMap: {} as MapString<IListEdit<T2>>,
        enableDel: true,
        enableOperate: true,
    }


    disableDelete() {
        this.cfg.enableDel = false;
    }

    /**
     * 禁用编辑操作按钮
     */
    disableOperate() {
        this.cfg.enableOperate = false;
    }

    /**
     * 设置显示的字段
     * @param f
     */
    setShowField(f: PartialType<T, string>) {
        for (let k in f) {
            this.cfg.showFieldList.push(k);
            this.cfg.showFieldMap[k] = f[k]!
        }
    }

    /**
     *设置字段的显示回调
     */
    setShowFunc(f: PartialType<T, (f: string | number, dat: T, index: number) => string | number>) {
        for (let k in f) {
            this.cfg.showFunc[k] = f[k]!;
        }
    }

    /**
     * 设置自定义字段
     * @param f 字段:[显示回调，点击回调]
     */
    setCustomField(f: MapString<[ListItemFunc<T, string>, ListItemFuncDom<T, any | Promise<void>>]>) {
        for (let k in f) {
            this.cfg.customFieldList.push(k);
            this.cfg.customFieldMap[k] = f[k]!;
        }
    }

    /**
     * 设置编辑字段
     * @param f
     */
    setEditFiled(f: PartialType<T, IListEdit<T>>) {
        for (let k in f) {
            this.cfg.editFiledMap[k] = f[k]!;
        }
    }

    /**
     * 设置编辑与添加字段
     * @param f
     */
    setEditAddFiled(f: PartialType<T | T2, IListEdit<T | T2>>) {
        for (let k in f) {
            this.cfg.editFiledMap[k] = f[k]!;
            this.cfg.addFieldMap[k] = f[k]!;
        }
    }

    /**
     * 设置添加字段
     * @param f
     */
    setAddFiled(f: PartialType<T2, IListEdit<T2>>) {
        for (let k in f) {
            this.cfg.addFieldMap[k] = f[k]!;
        }
    }

    /**
     * 开启单选模式
     * @param func
     */
    setSelectOneMode(func: (dat: T | null, index: number | null) => void) {
        this.selectMode = true;
        this.onAddClick = async () => {
            let sels = this.getCheckedRows();
            if (sels.length > 0) {
                func(sels[0].dat, sels[0].index);
            }
            else {
                func(null, null);
            }
        }
    }

    onItemClick = async (dat: T, row: number, field: string, target: HTMLElement) => {
        let title = this.cfg.showFieldMap[field];
        if (!title)
            title = field;

        let itemEdit = this.cfg.editFiledMap[field];

        let priId = dat[this.primaryKeyName];
        let showFunc = this.cfg.showFunc[field];
        let showValue = dat[field];
        if (showFunc)
            showValue = showFunc(showValue, dat, row);

        if (itemEdit) {
            let data: IListEditData<T> = {
                dat: dat,
                dom: null,
                field: field,
                index: row,
                isEditAll: false,
                isAdd: false,
                value: dat[field],
                funcValue: showValue,
            }

            await itemEdit.onShow(data);
            if (data.dom == null)
                return;

            let wind = new dfvWindow();
            wind.addCover();
            wind.showWithOk(`<b>${title}:</b>`, data.dom, async (pop) => {
                let valid = await itemEdit.onValid(data);
                if (!valid)
                    return;

                await apiCRUD.selectUpdateList({
                    id: priId as string,
                    id_name: this.primaryKeyName,
                    sets: [field, "set", dat[field]],
                    table: dfv.getFuncName(this.tableName),
                    where: [],
                }).resp();

                this.refreshList();

                wind.close();
            });

            return;
        }


        let custom = this.cfg.customFieldMap[field];

        if (custom) {
            custom[1](dat, row, target);
            return;
        }

        let wind = new dfvWindow();
        wind.addCover();
        wind.showWithOk(`<b>${title}:</b>`, showValue, async (pop) => {
            wind.close();
        });
    }

    /**
     * ajax结果
     * @type {ListResp}
     */
    list = Array<T>();

    /**
     * 视图
     * @type {ListTempView}
     */
    view: ListTempView<T, T2> = new ListTempView<T, T2>(this);


    onLoadList = () => {

    }

    /**
     * ajax重新加载列表数据
     */
    loadList() {

        this.db._reqList.count = this.req.count;
        this.db._reqList.id = this.req.currentObj ? this.req.currentObj[this.primaryKeyName] : "";
        this.db._reqList.old = this.req.old;

        this.db._reqList.second_id = this.secondKeyName.length > 0 && this.req.currentObj ? this.req.currentObj[this.secondKeyName] : null;
        this.db._reqList.second_name = this.secondKeyName;
        this.db._reqList.num = this.view.itemCount;
        this.db._reqList.id_name = this.primaryKeyName;
        this.db._reqList.goto = this.req.goto;

        apiCRUD.selectList(this.db._reqList).resp().then(res => {

            //按主键id倒序排列
            this.onLoadListRes(res);
            this.list = res.list;
            this.refreshList();

            //处理页码
            if (res.count != null) {
                this.dat.count = res.count;
                this.countPage();
            }

            this.db._reqList.count = this.req.count = 0;
            this.db._reqList.goto = this.req.goto = 0;

            this.onLoadList();
        });


    }

    refreshList() {
        //初始化
        dfvFront.setEle(this.view.tbodyList, this.view.initList(this.list));
    }

    countPage() {
        this.dat.totalPage = Math.ceil(this.dat.count / this.view.itemCount);
        if (this.dat.totalPage < 1)
            this.dat.totalPage = 1;
    }

    private getListLast() {
        if (this.list.length > 0) {
            return this.list[this.list.length - 1];
        }
        return null;
    }

    private getListFirst() {
        if (this.list.length > 0) {
            return this.list[0];
        }
        return null;
    }

    onStart = () => {

    }

    /**
     * 加载首页
     */
    firstPage() {
        this.req.currentObj = null;
        if (this.orderDesc)
            this.req.old = 0;
        else
            this.req.old = 1;
        this.req.count = 1;
        this.dat.currentPage = 1;
        this.loadList();
    }

    gotoPage(page: number) {
        if (page < 1 || page > this.dat.totalPage)
            return;

        this.req.currentObj = null;
        if (this.orderDesc)
            this.req.old = 0;
        else
            this.req.old = 1;

        this.req.count = 0;
        this.req.goto = page;
        this.dat.currentPage = page;
        this.loadList();
    }

    /**
     * 加载下一页
     */
    nextPage() {
        if (this.dat.currentPage >= this.dat.totalPage)
            return;

        this.req.currentObj = this.getListLast()
        if (this.orderDesc)
            this.req.old = 1;
        else
            this.req.old = 0;

        this.req.count = 0;
        this.dat.currentPage += 1;
        this.loadList();
    }

    /**
     * 加载上一页
     */
    prevPage() {
        if (this.dat.currentPage <= 1)
            return;

        this.req.currentObj = this.getListFirst();
        if (this.orderDesc)
            this.req.old = 0;
        else
            this.req.old = 1;

        this.req.count = 0;
        this.dat.currentPage -= 1;
        this.loadList();
    }

    lastPage() {
        this.req.currentObj = null;
        if (this.orderDesc)
            this.req.old = 1;
        else
            this.req.old = 0;

        this.req.count = 0;
        this.dat.currentPage = this.dat.totalPage;
        this.loadList();
    }


    /**
     * 获取选中的行
     * @returns {{dat: T, index: number}[]}
     */
    getCheckedRows(): { dat: T, index: number }[] {

        let list: { dat: T, index: number }[] = [];

        for (let i = 0; i < this.view.tableBody.children.length; i++) {
            let row = this.view.tableBody.children[i] as HTMLTableRowElement;
            dfvFront.eachElement(row, (checkBox: HTMLInputElement) => {
                if (checkBox.localName == LocalName.input && checkBox.type == InputType.checkbox && checkBox.checked) {
                    list.push({
                        dat: this.list[i],
                        index: i,
                    })
                    return false;
                }
                return true;
            })


        }

        return list;
    }


    /**
     * 删除行
     * @param dels
     */
    onDelClick(dels: { dat: T, index: number }[]) {
        let wind = new dfvWindow();
        wind.addCover();
        wind.showWithOk("<b>删除</b>", <div class="pad8">确定要删除{dels.length}条记录？</div>, e => {
            wind.close();

            let ids = dels.map(it => it.dat[this.primaryKeyName]);
            apiCRUD.selectDelList({
                id_name: this.primaryKeyName,
                ids: ids,
                table: dfv.getFuncName(this.insertTable),
                where: [],
            }).resp().then(res => {
                ListTemp.addDelLog(this.getColumSting(dels));

                this.dat.count -= dels.length;
                this.countPage()

                //倒序删除索引不错位
                // dels.sort((l, r) => r.index - l.index);
                // dels.forEach(r => {
                //     this.list.splice(r.index);
                // });


                this.loadList();
            });

        });

    }


    private getColumSting(dat: { dat: T, index: number }[]) {
        let ret = "";
        dat.forEach(it => {
            this.cfg.showFieldList.forEach(key => {
                ret += this.cfg.showFieldMap[key] + ":" + this.view.getFieldVal(it.index, it.dat, key) + " ";
            })
            ret += "\r\n";
        });

        return ret;
    }

    static addDelLog(log: string) {

    }

    onLoadListRes = (dat: ListResp<T>) => {
        if (this.secondKeyName.length > 0) {
            //按主键id倒序排列
            if (this.orderDesc) {
                dat.list.sort((l, r) => {
                    var ores = dfv.compare(r[this.secondKeyName!], l[this.secondKeyName!]);
                    if (ores == 0) {
                        return dfv.compare(r[this.primaryKeyName], l[this.primaryKeyName])
                    }
                    return ores;
                });
            }
            else {
                dat.list.sort((l, r) => {
                    var ores = dfv.compare(l[this.secondKeyName!], r[this.secondKeyName!]);
                    if (ores == 0) {
                        return dfv.compare(l[this.primaryKeyName], r[this.primaryKeyName])
                    }
                    return ores;
                });
            }
        }
        else {
            //按主键id倒序排列
            if (this.orderDesc)
                dat.list.sort((l, r) => dfv.compare(r[this.primaryKeyName], l[this.primaryKeyName]));
            else {
                dat.list.sort((l, r) => dfv.compare(l[this.primaryKeyName], r[this.primaryKeyName]));
            }
        }

    }


    onSearch = () => {

    }

    onSearchClick = () => {
        this.db.clear();
        this.onStart();
        this.onSearch();
        this.firstPage();
        // this.view.buttonClear.style.display = "block";
    }

    onClearClick = () => {
        this.db.clear();
        this.onStart();
        this.dat.name = "";
        this.dat.dateFrom = "";
        this.dat.dateTo = "";
        if (this.view.dateTo)
            this.view.dateTo.value = "";
        if (this.view.dateFrom)
            this.view.dateFrom.value = "";
        this.firstPage();
        // this.view.buttonClear.style.display = "hide";
    }

    /**
     *  添加日期查询字段
     */
    addDateWhere(func: (f: T) => any) {
        if (this.dat.dateFrom == '' || this.dat.dateTo == '')
            return;

        let to = new Date(this.dat.dateTo);
        to.setDate(to.getDate() + 1);
        this.db.and(f => func(f).gtEq(new Date(this.dat.dateFrom).getTime())
            & func(f).le(to.getTime()));
    }

    onPageClick = () => {
        let wind = new dfvWindow();
        let text: HTMLTextAreaElement;
        let errDiv: HTMLDivElement;
        wind.addCover();
        wind.showWithOk(`<div  class="h_m blod">请输入页码: </div>`,
            <div>
                {text = <textarea class="txt_blue" style="width: 98%; height: 70px;" />}
                {errDiv = <div class="red" />}
            </div>,
            e => {
                let res = text.value;
                let page = parseInt(res);
                if (isNaN(page) || page < 1 || page > this.dat.totalPage) {
                    errDiv.innerHTML = "无效页码";
                    text.select();
                    return;
                }
                this.gotoPage(page)
                wind.close();
            })
        text.select();
    }


    popAddWindow: dfvWindow | null = null;

    /**
     * 添加按钮点击
     */
    async onAddClick() {
        let ins = valid.bindAble(this.insertTable);
        let insExtView = await this.view.insertExtView(ins);

        this.popAddWindow = dfvFront.alert(`<b>添加-${this.title}:</b>`, await this.view.addTemp(ins, insExtView));
    }

    popEditWindow: dfvWindow | null = null;

    /**
     * 点击编辑所有字段
     * @param index
     * @returns {Promise<void>}
     */
    async onEditAllClick(index: number) {
        let edit = valid.bindAble(this.list[index]);
        let insExtView = await this.view.editAllExtView(edit);

        this.popEditWindow = dfvFront.alert(`<b>编辑:</b>`, await this.view.editAllTemp(edit, insExtView, index));
    }


    async beforEditAllCommit(edit: T) {
        let c = await valid.checkAsync(edit)
        if (!c.ok) {
            if (c.msg != "") {
                dfvFront.msg(c.msg);
            }
            return false;
        }
        return true;
    }

    async onEditSuccess(edit: T) {

    }

    onEditAllCommit = async (dat: T) => {
        for (let k in this.cfg.editFiledMap) {
            let edit = this.cfg.editFiledMap[k];

            // let showFunc = this.cfg.showFunc[k];
            // let showValue = ins[k];
            // if (showFunc)
            //     showValue = showFunc(showValue, ins as T, 0);

            let e: IListEditData<T> = {
                dat: dat,
                dom: null,
                isEditAll: true,
                isAdd: true,
                index: 0,
                field: k,
                value: dat[k],
                funcValue: dat[k],
            }

            if (!(await edit.onValid(e)))
                return;
        }
        if (!(await this.beforEditAllCommit(dat)))
            return;

        let priId = dat[this.primaryKeyName];
        let dbSet = new DbSession(this.tableName);

        for (let k in dat) {
            if (k == this.primaryKeyName || dat[k] instanceof Function)
                continue;
            dbSet.set(f => f[k].set(dat[k]))
        }


        await apiCRUD.selectUpdateList({
            id: priId,
            id_name: this.primaryKeyName,
            sets: dbSet._set,
            table: dfv.getFuncName(this.tableName),
            where: [],
        }).resp();

        await this.onEditSuccess(dat);

        if (this.popEditWindow) {
            this.popEditWindow.close();
            this.popEditWindow = null;
        }
        this.refreshList()
    }


    async beforInsertCommit(edit: T2): Promise<boolean> {
        let c = await valid.checkAsync(edit)
        if (!c.ok) {
            if (c.msg != "") {
                dfvFront.msg(c.msg);
            }
            return false;
        }
        return true;
    }

    /**
     * 插入点击事件
     * @param ins
     */
    async onInsertClick(ins: T2) {
        for (let k in this.cfg.addFieldMap) {
            let edit = this.cfg.addFieldMap[k];

            // let showFunc = this.cfg.showFunc[k];
            // let showValue = ins[k];
            // if (showFunc)
            //     showValue = showFunc(showValue, ins as T, 0);

            let e: IListEditData<T2> = {
                dat: ins,
                dom: null,
                isEditAll: true,
                isAdd: true,
                index: 0,
                field: k,
                value: ins[k],
                funcValue: ins[k],
            }

            if (!(await edit.onValid(e)))
                return;
        }
        if (!(await this.beforInsertCommit(ins))) {
            return
        }

        let insDb = new DbSession(this.insertTable);
        insDb.insert(ins).then(res => {

            if (this.popAddWindow) {
                this.popAddWindow.close();
                this.popAddWindow = null;
            }

            this.firstPage();
        });
    }

    /**
     * 字串编辑字段
     * @param validEdit
     */
    editText(validEdit?: (val: any, dat: T) => any) {
        return new TempTextEdit(validEdit);
    }

    render() {
        this.onStart();
        return this.view.render();
    }

}