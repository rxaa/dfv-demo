"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const dfvBind_1 = require("dfv/src/public/dfvBind");
const com_1 = require("../../../lib/com");
const LayDate_1 = require("../component/LayDate");
class ListTempView {
    constructor(temp) {
        this.temp = temp;
        /**
         * 每页条目数
         */
        this.itemCount = 10;
        this.maxFiledLength = 30;
        this.extSearch = () => {
        };
        /**
         * 添加窗口额外的input内容
         * @param ins
         * @param isEdit
         */
        this.insertExtView = (ins) => {
        };
        /**
         * 添加窗口额外的editAll内容
         * @param ins
         * @param isEdit
         */
        this.editAllExtView = (ins) => {
        };
        /**
         * 添加窗口模板
         */
        this.addTemp = async (ins, insertView) => com_1.com.isMobile() ?
            React.createElement("div", { style: "min-width:130px", class: " pad5" },
                await this.getEditFields(ins, this.temp.cfg.addFieldMap, 0, true),
                insertView,
                React.createElement("button", { class: "button_green pad6-12", onclick: () => this.temp.onInsertClick(ins) }, "\u786E\u5B9A\u6DFB\u52A0"))
            :
                React.createElement("div", { style: "min-width:200px", class: "pad10" },
                    React.createElement("table", { cellPadding: "5" },
                        await this.getEditFields(ins, this.temp.cfg.addFieldMap, 0, true),
                        insertView,
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("button", { class: "button_green pad6-12", onclick: () => this.temp.onInsertClick(ins) }, "\u786E\u5B9A\u6DFB\u52A0")))));
        /**
         * 编辑窗口模板
         */
        this.editAllTemp = async (ins, insertView, index) => com_1.com.isMobile() ?
            React.createElement("div", { style: "min-width:130px", class: " pad5" },
                await this.getEditFields(ins, this.temp.cfg.editFiledMap, index),
                insertView,
                React.createElement("button", { class: "button_blue pad6-12", onclick: () => this.temp.onEditAllCommit(ins) }, "\u786E\u5B9A\u7F16\u8F91"))
            :
                React.createElement("div", { style: "min-width:200px", class: "pad10" },
                    React.createElement("table", { cellPadding: "5" },
                        await this.getEditFields(ins, this.temp.cfg.editFiledMap, index),
                        insertView,
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("button", { class: "button_blue pad6-12", onclick: () => this.temp.onEditAllCommit(ins) }, "\u786E\u5B9A\u7F16\u8F91")))));
        /**
         * 标题搜索输入框
         */
        this.searchInput = () => React.createElement("input", { type: "text", class: "txt_blue mar10l", style: "width:150px", placeholder: this.temp.title + "名", value: dfvBind_1.dfvBind(e => this.temp.dat.name) });
        this.dateTitle = "日期：";
        this.dateFrom = new LayDate_1.LayDateDfv();
        this.dateTo = new LayDate_1.LayDateDfv();
        this.dateInput = () => React.createElement("div", null,
            this.dateTitle,
            this.dateFrom.render({
                style: "width:95px;",
            }),
            "-",
            this.dateTo.render({
                style: "width:95px;",
            }),
            this.initDate());
        /**
         * 搜索内容
         */
        this.search = () => React.createElement("div", { class: "x-center y-center mar10t " + (com_1.com.isMobile() ? "flex-col" : "flex-row") },
            this.extSearch(),
            this.dateInput(),
            React.createElement("div", { class: com_1.com.isMobile() ? "mar5t" : "" },
                this.searchInput(),
                React.createElement("button", { class: "button_blue  pad4-10 mar10l", onclick: this.temp.onSearchClick }, "\u641C\u7D22")));
        this.delAndAdd = () => this.temp.selectMode ?
            React.createElement("button", { class: "button_green  pad4-10 mar10l", onclick: () => this.temp.onAddClick() }, "\u786E\u5B9A\u9009\u62E9")
            :
                React.createElement("div", { class: "flex-row mar10l" },
                    this.temp.cfg.enableDel && !com_1.com.isMobile() ?
                        React.createElement("button", { class: "button_red  pad4-10 mar10l", onclick: () => this._onDelClick() }, "\u6279\u91CF\u5220\u9664")
                        :
                            null,
                    this.addButton(),
                    this.extButton());
        this.extButton = () => {
        };
        /**
         * 添加按钮
         */
        this.addButton = () => React.createElement("button", { class: "button_green pad4-10 mar10l", onclick: () => this.temp.onAddClick() }, "\u6DFB\u52A0");
        this.dataCount = () => React.createElement("div", { class: "flex x-end flex-row y-center" },
            com_1.com.isMobile() ?
                React.createElement("span", null,
                    "\u5171:",
                    React.createElement("strong", null, dfvBind_1.dfvBind(e => this.temp.dat.count)),
                    "\u6761")
                :
                    React.createElement("span", null,
                        "\u603B\u5171:",
                        React.createElement("strong", null, dfvBind_1.dfvBind(e => this.temp.dat.count)),
                        "\u6761,\u6BCF\u9875",
                        React.createElement("strong", null, this.itemCount),
                        "\u6761"),
            this.buttonClear =
                React.createElement("button", { class: "button_green pad4-10", onclick: () => this.temp.onClearClick() }, "\u5237\u65B0"));
        this.editExtButton = (dat, index) => {
        };
        this.editAllButton = (dat, index) => React.createElement("button", { class: "button_blue mar5l pad4-10", onclick: () => this.temp.onEditAllClick(index) }, "\u7F16\u8F91");
        this.delButton = (dat, index) => React.createElement("button", { class: "button_red mar5l pad4-10", onclick: e => this._onDelClick(index) }, "\u5220\u9664");
        this.itemHandel = (dat, index) => React.createElement("span", null,
            this.editExtButton(dat, index),
            this.editAllButton(dat, index),
            this.temp.cfg.enableDel ? this.delButton(dat, index) : null);
        this.initMobilList = (dat) => dat.map((row, datI) => React.createElement("table", { style: "width: 100%", class: "h_m table_grey mar5t" },
            React.createElement("tbody", null,
                this.temp.cfg.showFieldList.map(it => React.createElement("tr", null,
                    React.createElement("td", null, this.temp.cfg.showFieldMap[it]),
                    React.createElement("td", { onclick: e => this.temp.onItemClick(row, datI, it, e.currentTarget) }, this.getFieldVal(datI, row, it, this.maxFiledLength)))),
                this.temp.cfg.customFieldList.map(it => React.createElement("tr", null,
                    React.createElement("td", null, it),
                    React.createElement("td", { onclick: e => this.temp.onItemClick(row, datI, it, e.currentTarget) }, this.temp.cfg.customFieldMap[it][0](row, datI)))),
                this.temp.cfg.enableOperate ? React.createElement("tr", null,
                    React.createElement("td", null, "\u64CD\u4F5C"),
                    React.createElement("td", null,
                        " ",
                        this.itemHandel(row, datI)))
                    : null)));
        /**
         * 初始化表单
         * @param dat 数据列表
         */
        this.initList = (dat) => com_1.com.isMobile() ? this.initMobilList(dat) :
            React.createElement("table", { style: "width: 100%", class: "h_m table_grey" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { width: "25" }, this.temp.selectMode ? null :
                            React.createElement("input", { type: "checkbox", onclick: () => this.checkAll() })),
                        this.temp.cfg.showFieldList.map(it => React.createElement("th", null, this.temp.cfg.showFieldMap[it])),
                        this.temp.cfg.customFieldList.map(it => React.createElement("th", null, it)),
                        this.temp.cfg.enableOperate ? React.createElement("th", null, "\u64CD\u4F5C") : null)),
                this.tableBody =
                    React.createElement("tbody", null, dat.map((it, datI) => React.createElement("tr", null,
                        React.createElement("td", { style: "padding:0px" },
                            React.createElement("label", { class: "width_p100 height_p100 pad5" },
                                React.createElement("input", { type: "checkbox", onclick: e => this.onCheckBoxClick(e.currentTarget) }))),
                        this.temp.cfg.showFieldList.map(k => React.createElement("td", { onclick: e => this.temp.onItemClick(it, datI, k, e.currentTarget) }, this.getFieldVal(datI, it, k, this.maxFiledLength))),
                        this.temp.cfg.customFieldList.map(cf => React.createElement("td", { onclick: e => this.temp.onItemClick(it, datI, cf, e.currentTarget) }, this.temp.cfg.customFieldMap[cf][0](it, datI))),
                        this.temp.cfg.enableOperate ?
                            React.createElement("td", null, this.itemHandel(it, datI))
                            :
                                null))));
        /**
         * 主体
         */
        this.render = () => React.createElement("div", { class: "pad10 flex flex-col" },
            React.createElement("div", null,
                this.search(),
                React.createElement("div", { class: "flex-row mar10t" },
                    this.delAndAdd(),
                    this.dataCount()),
                this.tbodyList =
                    React.createElement("div", { class: "flex-col mar10t" }, this.initList([])),
                React.createElement("div", { class: "flex-row x-center mar10t" },
                    React.createElement("button", { className: "button_white pad4-10", onclick: () => this.temp.firstPage() }, "\u9996\u9875"),
                    React.createElement("button", { className: "button_white  mar5l  pad4-10", onclick: () => this.temp.prevPage() }, "\u4E0A\u9875"),
                    React.createElement("span", { class: " mar5l", onclick: () => this.temp.onPageClick() },
                        "(",
                        React.createElement("span", null, dfvBind_1.dfvBind(e => this.temp.dat.currentPage)),
                        "/",
                        React.createElement("span", null, dfvBind_1.dfvBind(e => this.temp.dat.totalPage)),
                        ")"),
                    React.createElement("button", { className: "button_white  mar5l  pad4-10", onclick: () => this.temp.nextPage() }, "\u4E0B\u9875"),
                    React.createElement("button", { className: "button_white  mar5l  pad4-10", onclick: () => this.temp.lastPage() }, "\u5C3E\u9875")),
                this.temp.loadList()));
    }
    initDate() {
        this.dateFrom.onSelected = (d) => this.temp.dat.dateFrom = d;
        this.dateTo.onSelected = (d) => this.temp.dat.dateTo = d;
    }
    /**
     * 反转选中状态
     * @param currentTarget
     */
    checkAll() {
        this.temp.dat.checkAll = !this.temp.dat.checkAll;
        for (let i = 0; i < this.tableBody.children.length; i++) {
            let row = this.tableBody.children[i];
            dfvFront_1.dfvFront.eachElement(row, (checkBox) => {
                if (checkBox.localName == dfvFront_1.LocalName.input && checkBox.type == dfvFront_1.InputType.checkbox) {
                    checkBox.checked = this.temp.dat.checkAll;
                    return false;
                }
                return true;
            });
        }
    }
    onCheckBoxClick(currentTarget) {
        if (!this.temp.selectMode)
            return;
        /**
         * 单选模式，
         */
        for (let i = 0; i < this.tableBody.children.length; i++) {
            let row = this.tableBody.children[i];
            dfvFront_1.dfvFront.eachElement(row, (checkBox) => {
                if (checkBox.localName == dfvFront_1.LocalName.input && checkBox.type == dfvFront_1.InputType.checkbox && checkBox.checked) {
                    if (checkBox != currentTarget)
                        checkBox.checked = false;
                }
            });
        }
    }
    /**
     * 获取对像的字段内容
     * @param row 行号
     * @param dat 对象
     * @param field 字段
     * @param maxNum 字串最大长度
     * @returns {any}
     */
    getFieldVal(row, dat, field, maxNum) {
        let val = dat[field];
        if (this.temp.cfg.showFunc[field]) {
            return this.temp.cfg.showFunc[field](val, dat, row);
        }
        if (maxNum != null && typeof val === "string" && val.length > maxNum) {
            val = val.substr(0, maxNum) + "...";
        }
        return val;
    }
    /**
     * 获取删除行
     * @param row
     * @private
     */
    _onDelClick(row) {
        let list = [];
        if (row != null) {
            list = [{
                    dat: this.temp.list[row],
                    index: row,
                }];
        }
        else {
            list = this.temp.getCheckedRows();
        }
        if (list.length < 1)
            return;
        this.temp.onDelClick(list);
    }
    newLine(title, body) {
        if (com_1.com.isMobile()) {
            return (React.createElement("div", { class: " mar10b" },
                React.createElement("div", null, title),
                React.createElement("div", null, body)));
        }
        else {
            return (React.createElement("tr", null,
                React.createElement("td", null, title),
                React.createElement("td", null, body)));
        }
    }
    /**
     * 获取编辑字段列表
     * @param dat
     * @param fs
     * @param index
     * @returns {Promise<any[]>}
     */
    async getEditFields(dat, fs, index, add) {
        let ret = Array();
        for (let k in fs) {
            let edit = fs[k];
            let title = this.temp.cfg.showFieldMap[k];
            if (title == null)
                title = k;
            let showFunc = this.temp.cfg.showFunc[k];
            let showValue = dat[k];
            if (showFunc)
                showValue = showFunc(showValue, dat, index);
            let e = {
                dat: dat,
                dom: null,
                isEditAll: true,
                isAdd: !!add,
                index: index,
                field: k,
                value: dat[k],
                funcValue: showValue,
            };
            await edit.onShow(e);
            if (e.dom == null)
                continue;
            ret.push(this.newLine(title + ":", e.dom));
        }
        return ret;
    }
}
exports.ListTempView = ListTempView;
//# sourceMappingURL=ListTempView.js.map