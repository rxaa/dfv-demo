"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const ListTempView_1 = require("./ListTempView");
const apiCRUD_1 = require("../db/apiCRUD");
const TempTextEdit_1 = require("./TempTextEdit");
const dfv_1 = require("dfv/src/public/dfv");
const valid_1 = require("dfv/src/public/valid");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const dfvWindow_1 = require("dfv/src/public/dfvWindow");
const DbSession_1 = require("../db/DbSession");
/**
 * 新建list模板
 * @param tableName 显示的表或视图
 * @param title 名称
 * @param insertTable 需要insert数据的表
 * @returns {ListTemp<T, T2>}
 */
function newListTemp(tableName, title, insertTable) {
    return new ListTemp(tableName, title, insertTable);
}
exports.newListTemp = newListTemp;
/**
 * 分页列表模板
 */
class ListTemp {
    constructor(tableName, title, insertTable) {
        this.tableName = tableName;
        this.title = title;
        this.insertTable = insertTable;
        this.uniqueId = dfv_1.dfv.getUniqueId16();
        /**
         * 是否按倒序排列
         * @type {boolean}
         */
        this.orderDesc = true;
        /**
         * 开启list item选择模式，否则为批量删除
         * @type {boolean}
         */
        this.selectMode = false;
        /**
         * 开启多选
         * @type {boolean}
         */
        this.mutiSelect = false;
        /**
         * ajax接口入参
         */
        this.req = {
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
            currentObj: null,
        };
        /**
         * 界面上动态绑定的内容
         */
        this.dat = valid_1.valid.bindAble({
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
        this.primaryKeyName = "";
        /**
         * 次键，次要排序字段如时间
         */
        this.secondKeyName = "";
        /**
         * 数据库操作
         * @type {DbSession<T>}
         */
        this.db = new DbSession_1.DbSession(this.tableName);
        this.cfg = {
            /**
             * 显示用字段名列表(key值)
             */
            showFieldList: dfv_1.arrayString(),
            /**
             * 字段key->中文名
             */
            showFieldMap: {},
            /**
             * 字段的显示函数
             */
            showFunc: {},
            /**
             * 自定义字段:[显示回调，点击回调]
             */
            customFieldMap: {},
            customFieldList: dfv_1.arrayString(),
            editFiledMap: {},
            addFieldMap: {},
            enableDel: true,
            enableOperate: true,
        };
        this.onItemClick = async (dat, row, field, target) => {
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
                let data = {
                    dat: dat,
                    dom: null,
                    field: field,
                    index: row,
                    isEditAll: false,
                    isAdd: false,
                    value: dat[field],
                    funcValue: showValue,
                };
                await itemEdit.onShow(data);
                if (data.dom == null)
                    return;
                let wind = new dfvWindow_1.dfvWindow();
                wind.addCover();
                wind.showWithOk(`<b>${title}:</b>`, data.dom, async (pop) => {
                    let valid = await itemEdit.onValid(data);
                    if (!valid)
                        return;
                    await apiCRUD_1.apiCRUD.selectUpdateList({
                        id: priId,
                        id_name: this.primaryKeyName,
                        sets: [field, "set", dat[field]],
                        table: dfv_1.dfv.getFuncName(this.tableName),
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
            let wind = new dfvWindow_1.dfvWindow();
            wind.addCover();
            wind.showWithOk(`<b>${title}:</b>`, showValue, async (pop) => {
                wind.close();
            });
        };
        /**
         * ajax结果
         * @type {ListResp}
         */
        this.list = Array();
        /**
         * 视图
         * @type {ListTempView}
         */
        this.view = new ListTempView_1.ListTempView(this);
        this.onLoadList = () => {
        };
        this.onStart = () => {
        };
        this.onLoadListRes = (dat) => {
            if (this.secondKeyName.length > 0) {
                //按主键id倒序排列
                if (this.orderDesc) {
                    dat.list.sort((l, r) => {
                        var ores = dfv_1.dfv.compare(r[this.secondKeyName], l[this.secondKeyName]);
                        if (ores == 0) {
                            return dfv_1.dfv.compare(r[this.primaryKeyName], l[this.primaryKeyName]);
                        }
                        return ores;
                    });
                }
                else {
                    dat.list.sort((l, r) => {
                        var ores = dfv_1.dfv.compare(l[this.secondKeyName], r[this.secondKeyName]);
                        if (ores == 0) {
                            return dfv_1.dfv.compare(l[this.primaryKeyName], r[this.primaryKeyName]);
                        }
                        return ores;
                    });
                }
            }
            else {
                //按主键id倒序排列
                if (this.orderDesc)
                    dat.list.sort((l, r) => dfv_1.dfv.compare(r[this.primaryKeyName], l[this.primaryKeyName]));
                else {
                    dat.list.sort((l, r) => dfv_1.dfv.compare(l[this.primaryKeyName], r[this.primaryKeyName]));
                }
            }
        };
        this.onSearch = () => {
        };
        this.onSearchClick = () => {
            this.db.clear();
            this.onStart();
            this.onSearch();
            this.firstPage();
            // this.view.buttonClear.style.display = "block";
        };
        this.onClearClick = () => {
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
        };
        this.onPageClick = () => {
            let wind = new dfvWindow_1.dfvWindow();
            let text;
            let errDiv;
            wind.addCover();
            wind.showWithOk(`<div  class="h_m blod">请输入页码: </div>`, React.createElement("div", null,
                text = React.createElement("textarea", { class: "txt_blue", style: "width: 98%; height: 70px;" }),
                errDiv = React.createElement("div", { class: "red" })), e => {
                let res = text.value;
                let page = parseInt(res);
                if (isNaN(page) || page < 1 || page > this.dat.totalPage) {
                    errDiv.innerHTML = "无效页码";
                    text.select();
                    return;
                }
                this.gotoPage(page);
                wind.close();
            });
            text.select();
        };
        this.popAddWindow = null;
        this.popEditWindow = null;
        this.onEditAllCommit = async (dat) => {
            for (let k in this.cfg.editFiledMap) {
                let edit = this.cfg.editFiledMap[k];
                // let showFunc = this.cfg.showFunc[k];
                // let showValue = ins[k];
                // if (showFunc)
                //     showValue = showFunc(showValue, ins as T, 0);
                let e = {
                    dat: dat,
                    dom: null,
                    isEditAll: true,
                    isAdd: true,
                    index: 0,
                    field: k,
                    value: dat[k],
                    funcValue: dat[k],
                };
                if (!(await edit.onValid(e)))
                    return;
            }
            if (!(await this.beforEditAllCommit(dat)))
                return;
            let priId = dat[this.primaryKeyName];
            let dbSet = new DbSession_1.DbSession(this.tableName);
            for (let k in dat) {
                if (k == this.primaryKeyName || dat[k] instanceof Function)
                    continue;
                dbSet.set(f => f[k].set(dat[k]));
            }
            await apiCRUD_1.apiCRUD.selectUpdateList({
                id: priId,
                id_name: this.primaryKeyName,
                sets: dbSet._set,
                table: dfv_1.dfv.getFuncName(this.tableName),
                where: [],
            }).resp();
            await this.onEditSuccess(dat);
            if (this.popEditWindow) {
                this.popEditWindow.close();
                this.popEditWindow = null;
            }
            this.refreshList();
        };
    }
    /**
     * 改为正序显示
     * @param desc
     */
    setOrderAsc() {
        this.orderDesc = false;
        this.req.old = 1;
    }
    /**
     * 设置主键与次键（先按次键排序，重复再按主键排序）
     * @param pk
     * @param secondKey
     */
    setPrimaryKey(pk, secondKey) {
        for (let k in pk) {
            this.primaryKeyName = k;
        }
        if (secondKey) {
            for (let k in secondKey) {
                this.secondKeyName = k;
            }
        }
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
    setShowField(f) {
        for (let k in f) {
            this.cfg.showFieldList.push(k);
            this.cfg.showFieldMap[k] = f[k];
        }
    }
    /**
     *设置字段的显示回调
     */
    setShowFunc(f) {
        for (let k in f) {
            this.cfg.showFunc[k] = f[k];
        }
    }
    /**
     * 设置自定义字段
     * @param f 字段:[显示回调，点击回调]
     */
    setCustomField(f) {
        for (let k in f) {
            this.cfg.customFieldList.push(k);
            this.cfg.customFieldMap[k] = f[k];
        }
    }
    /**
     * 设置编辑字段
     * @param f
     */
    setEditFiled(f) {
        for (let k in f) {
            this.cfg.editFiledMap[k] = f[k];
        }
    }
    /**
     * 设置编辑与添加字段
     * @param f
     */
    setEditAddFiled(f) {
        for (let k in f) {
            this.cfg.editFiledMap[k] = f[k];
            this.cfg.addFieldMap[k] = f[k];
        }
    }
    /**
     * 设置添加字段
     * @param f
     */
    setAddFiled(f) {
        for (let k in f) {
            this.cfg.addFieldMap[k] = f[k];
        }
    }
    /**
     * 开启单选模式
     * @param func
     */
    setSelectOneMode(func) {
        this.selectMode = true;
        this.onAddClick = async () => {
            let sels = this.getCheckedRows();
            if (sels.length > 0) {
                func(sels[0].dat, sels[0].index);
            }
            else {
                func(null, null);
            }
        };
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
        apiCRUD_1.apiCRUD.selectList(this.db._reqList).resp().then(res => {
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
        dfvFront_1.dfvFront.setEle(this.view.tbodyList, this.view.initList(this.list));
    }
    countPage() {
        this.dat.totalPage = Math.ceil(this.dat.count / this.view.itemCount);
        if (this.dat.totalPage < 1)
            this.dat.totalPage = 1;
    }
    getListLast() {
        if (this.list.length > 0) {
            return this.list[this.list.length - 1];
        }
        return null;
    }
    getListFirst() {
        if (this.list.length > 0) {
            return this.list[0];
        }
        return null;
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
    gotoPage(page) {
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
        this.req.currentObj = this.getListLast();
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
    getCheckedRows() {
        let list = [];
        for (let i = 0; i < this.view.tableBody.children.length; i++) {
            let row = this.view.tableBody.children[i];
            dfvFront_1.dfvFront.eachElement(row, (checkBox) => {
                if (checkBox.localName == dfvFront_1.LocalName.input && checkBox.type == dfvFront_1.InputType.checkbox && checkBox.checked) {
                    list.push({
                        dat: this.list[i],
                        index: i,
                    });
                    return false;
                }
                return true;
            });
        }
        return list;
    }
    /**
     * 删除行
     * @param dels
     */
    onDelClick(dels) {
        let wind = new dfvWindow_1.dfvWindow();
        wind.addCover();
        wind.showWithOk("<b>删除</b>", React.createElement("div", { class: "pad8" },
            "\u786E\u5B9A\u8981\u5220\u9664",
            dels.length,
            "\u6761\u8BB0\u5F55\uFF1F"), e => {
            wind.close();
            let ids = dels.map(it => it.dat[this.primaryKeyName]);
            apiCRUD_1.apiCRUD.selectDelList({
                id_name: this.primaryKeyName,
                ids: ids,
                table: dfv_1.dfv.getFuncName(this.insertTable),
                where: [],
            }).resp().then(res => {
                ListTemp.addDelLog(this.getColumSting(dels));
                this.dat.count -= dels.length;
                this.countPage();
                //倒序删除索引不错位
                // dels.sort((l, r) => r.index - l.index);
                // dels.forEach(r => {
                //     this.list.splice(r.index);
                // });
                this.loadList();
            });
        });
    }
    getColumSting(dat) {
        let ret = "";
        dat.forEach(it => {
            this.cfg.showFieldList.forEach(key => {
                ret += this.cfg.showFieldMap[key] + ":" + this.view.getFieldVal(it.index, it.dat, key) + " ";
            });
            ret += "\r\n";
        });
        return ret;
    }
    static addDelLog(log) {
    }
    /**
     *  添加日期查询字段
     */
    addDateWhere(func) {
        if (this.dat.dateFrom == '' || this.dat.dateTo == '')
            return;
        let to = new Date(this.dat.dateTo);
        to.setDate(to.getDate() + 1);
        this.db.and(f => func(f).gtEq(new Date(this.dat.dateFrom).getTime())
            & func(f).le(to.getTime()));
    }
    /**
     * 添加按钮点击
     */
    async onAddClick() {
        let ins = valid_1.valid.bindAble(this.insertTable);
        let insExtView = await this.view.insertExtView(ins);
        this.popAddWindow = dfvFront_1.dfvFront.alert(`<b>添加-${this.title}:</b>`, await this.view.addTemp(ins, insExtView));
    }
    /**
     * 点击编辑所有字段
     * @param index
     * @returns {Promise<void>}
     */
    async onEditAllClick(index) {
        let edit = valid_1.valid.bindAble(this.list[index]);
        let insExtView = await this.view.editAllExtView(edit);
        this.popEditWindow = dfvFront_1.dfvFront.alert(`<b>编辑:</b>`, await this.view.editAllTemp(edit, insExtView, index));
    }
    async beforEditAllCommit(edit) {
        let c = await valid_1.valid.checkAsync(edit);
        if (!c.ok) {
            if (c.msg != "") {
                dfvFront_1.dfvFront.msg(c.msg);
            }
            return false;
        }
        return true;
    }
    async onEditSuccess(edit) {
    }
    async beforInsertCommit(edit) {
        let c = await valid_1.valid.checkAsync(edit);
        if (!c.ok) {
            if (c.msg != "") {
                dfvFront_1.dfvFront.msg(c.msg);
            }
            return false;
        }
        return true;
    }
    /**
     * 插入点击事件
     * @param ins
     */
    async onInsertClick(ins) {
        for (let k in this.cfg.addFieldMap) {
            let edit = this.cfg.addFieldMap[k];
            // let showFunc = this.cfg.showFunc[k];
            // let showValue = ins[k];
            // if (showFunc)
            //     showValue = showFunc(showValue, ins as T, 0);
            let e = {
                dat: ins,
                dom: null,
                isEditAll: true,
                isAdd: true,
                index: 0,
                field: k,
                value: ins[k],
                funcValue: ins[k],
            };
            if (!(await edit.onValid(e)))
                return;
        }
        if (!(await this.beforInsertCommit(ins))) {
            return;
        }
        let insDb = new DbSession_1.DbSession(this.insertTable);
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
    editText(validEdit) {
        return new TempTextEdit_1.TempTextEdit(validEdit);
    }
    render() {
        this.onStart();
        return this.view.render();
    }
}
exports.ListTemp = ListTemp;
//# sourceMappingURL=ListTemp.js.map