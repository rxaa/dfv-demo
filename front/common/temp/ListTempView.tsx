import * as React from "dfv/src/public/dfvReact";
import { ListTemp, IListEdit, IListEditData } from "./ListTemp";
import { MapString } from "dfv/src/public/dfv";
import { dfvFront, InputType, LocalName } from "dfv/src/public/dfvFront";
import { dfvBind } from "dfv/src/public/dfvBind";
import { frontCfg } from "../../../config/frontCfg";
import { com } from "../../../lib/com";


export class ListTempView<T, T2> {


    constructor(private temp: ListTemp<T, T2>) {

    }

    /**
     * 每页条目数
     */
    itemCount = 10;

    maxFiledLength = 30;

    tbodyList: HTMLDivElement;

    tableBody: HTMLTableSectionElement;

    extSearch = () => {
    }

    /**
     * 添加窗口额外的input内容
     * @param ins
     * @param isEdit
     */
    insertExtView = (ins: T2): any => {

    }

    /**
     * 添加窗口额外的editAll内容
     * @param ins
     * @param isEdit
     */
    editAllExtView = (ins: T): any => {

    }


    /**
     * 添加窗口模板
     */
    addTemp = async (ins: T2, insertView: any) => com.isMobile() ?
        <div style={"min-width:130px"} class=" pad5">
            {
                await this.getEditFields(ins, this.temp.cfg.addFieldMap, 0)
            }
            {insertView}
            <button class="button_green pad6-12"
                onclick={() => this.temp.onInsertClick(ins)}>
                确定添加
            </button>
        </div>
        :
        <div style={"min-width:200px"} class="pad10">
            <table cellPadding="5">
                {
                    await this.getEditFields(ins, this.temp.cfg.addFieldMap, 0)
                }
                {insertView}
                <tr>
                    <td></td>
                    <td>
                        <button class="button_green pad6-12" onclick={() => this.temp.onInsertClick(ins)}>
                            确定添加
                        </button>
                    </td>
                </tr>
            </table>
        </div>

    /**
     * 编辑窗口模板
     */
    editAllTemp = async (ins: T, insertView: any, index: number) => com.isMobile() ?
        <div style={"min-width:130px"} class=" pad5">
            {
                await this.getEditFields(ins, this.temp.cfg.editFiledMap, index)
            }
            {insertView}
            <button class="button_blue pad6-12" onclick={() => this.temp.onEditAllCommit(ins)}>
                确定编辑
                        </button>
        </div>
        :
        <div style={"min-width:200px"} class="pad10">
            <table cellPadding="5">
                {
                    await this.getEditFields(ins, this.temp.cfg.editFiledMap, index)
                }
                {insertView}
                <tr>
                    <td></td>
                    <td>
                        <button class="button_blue pad6-12" onclick={() => this.temp.onEditAllCommit(ins)}>
                            确定编辑
                        </button>
                    </td>
                </tr>
            </table>
        </div>


    /**
     * 标题搜索输入框
     */
    searchInput = () =>
        <input type="text" class="txt_blue mar10l" style="width:150px" placeholder={this.temp.title + "名"}
            value={dfvBind(e => this.temp.dat.name)}
        />


    dateTitle = "日期：";

    dateFrom: HTMLInputElement;
    dateTo: HTMLInputElement;
    dateInput = () =>
        <div>
            {this.dateTitle}
            {this.dateFrom = <input type="text" name="max_time" id={this.temp.uniqueId + "date_from"}
                class="txt_blue" readOnly={true} style="width:100px;"
            />}
            -
            {this.dateTo = <input type="text" name="min_time" id={this.temp.uniqueId + "date_to"}
                class="txt_blue" readOnly={true} style="width:100px;"
            />}
            {
                this.initDate()
            }
        </div>

    private initDate() {
        laydate.render({
            elem: this.dateFrom,
            done: (d, date) => this.temp.dat.dateFrom = d,
            theme: frontCfg.mainColor,
        });
        laydate.render({
            elem: this.dateTo,
            done: (d, date) => this.temp.dat.dateTo = d,
            theme: frontCfg.mainColor
        })
    }

    buttonClear: HTMLButtonElement;
    /**
     * 搜索内容
     */
    search = () =>
        <div class={"x-center y-center mar10t " + (com.isMobile() ? "flex-col" : "flex-row")}>
            {this.extSearch()}
            {this.dateInput()}
            <div class={com.isMobile() ? "mar5t" : ""}>
                {this.searchInput()}
                <button class="button_blue  pad4-10 mar10l" onclick={this.temp.onSearchClick}>
                    搜索
                </button>
            </div>
        </div>


    delAndAdd = () =>
        this.temp.selectMode ?
            <button class="button_green  pad4-10 mar10l" onclick={() => this.temp.onAddClick()}>
                确定选择
            </button>
            :
            <div class="flex-row mar10l">
                {
                    this.temp.cfg.enableDel && !com.isMobile() ?
                        <button class="button_red  pad4-10 mar10l" onclick={() => this._onDelClick()}>
                            批量删除
                        </button>
                        :
                        null
                }

                {
                    this.addButton()
                }
                {
                    this.extButton()
                }
            </div>


    extButton = () => {

    }
    /**
     * 添加按钮
     */
    addButton = () =>
        <button class="button_green pad4-10 mar10l" onclick={() => this.temp.onAddClick()}>
            添加
        </button>


    dataCount = () =>
        <div class="flex x-end flex-row y-center">
            {com.isMobile() ?
                <span>共:<strong>{dfvBind(e => this.temp.dat.count)}</strong>条</span>
                :
                <span>总共:<strong>{dfvBind(e => this.temp.dat.count)}</strong>
                    条,每页<strong>{this.itemCount}</strong>条</span>
            }
            {this.buttonClear =
                <button class="button_green pad4-10" onclick={() => this.temp.onClearClick()}>
                    刷新
        </button>}
        </div>


    editExtButton = (dat: T, index: number) => {
    }

    editAllButton = (dat: T, index: number) =>
        <button class="button_blue mar5l pad4-10" onclick={() => this.temp.onEditAllClick(index)}>
            编辑
        </button>

    delButton = (dat: T, index: number) =>
        <button class="button_red mar5l pad4-10" onclick={e => this._onDelClick(index)}>
            删除
        </button>


    itemHandel = (dat: T, index: number) =>
        <span>
            {this.editExtButton(dat, index)}
            {this.editAllButton(dat, index)}
            {this.temp.cfg.enableDel ? this.delButton(dat, index) : null}
        </span>


    initMobilList = (dat: T[]) =>
        dat.map((row, datI) =>
            <table style="width: 100%" class="h_m table_grey mar5t">
                <tbody>
                    {
                        this.temp.cfg.showFieldList.map(it =>
                            <tr>
                                <td>{this.temp.cfg.showFieldMap[it]}</td>
                                <td
                                    onclick={e => this.temp.onItemClick(row, datI, it, e.currentTarget)}>
                                    {this.getFieldVal(datI, row, it, this.maxFiledLength)}
                                </td>
                            </tr>
                        )
                    }
                    {
                        this.temp.cfg.customFieldList.map(it =>
                            <tr>
                                <td>{it}</td>
                                <td
                                    onclick={e => this.temp.onItemClick(row, datI, it, e.currentTarget)}>
                                    {this.temp.cfg.customFieldMap[it][0](row, datI)}
                                </td>
                            </tr>
                        )
                    }
                    {
                        this.temp.cfg.enableOperate ? <tr>
                            <td>操作</td>
                            <td> {this.itemHandel(row, datI)}</td>
                        </tr>
                            : null
                    }

                </tbody>
            </table>
        )


    /**
     * 初始化表单
     * @param dat 数据列表
     */
    initList = (dat: T[]) => com.isMobile() ? this.initMobilList(dat) :
        <table style="width: 100%" class="h_m table_grey">
            <thead>
                <tr>
                    <th width="25">
                        {this.temp.selectMode ? null :
                            <input type="checkbox" onclick={() => this.checkAll()}
                                checked={dfvBind(e => this.temp.dat.checkAll)} />}
                    </th>
                    {
                        this.temp.cfg.showFieldList.map(it =>
                            <th>{this.temp.cfg.showFieldMap[it]}</th>
                        )
                    }
                    {
                        this.temp.cfg.customFieldList.map(it =>
                            <th>{it}</th>
                        )
                    }
                    {
                        this.temp.cfg.enableOperate ? <th>操作</th> : null
                    }

                </tr>
            </thead>
            {this.tableBody =
                <tbody>
                    {
                        dat.map((it, datI) =>
                            <tr>
                                <td style="padding:0px">
                                    <label class="width_p100 height_p100 pad5">
                                        <input type="checkbox" onclick={e => this.onCheckBoxClick(e.currentTarget)} />
                                    </label>
                                </td>
                                {
                                    this.temp.cfg.showFieldList.map(k =>
                                        <td
                                            onclick={e => this.temp.onItemClick(it, datI, k, e.currentTarget)}>
                                            {this.getFieldVal(datI, it, k, this.maxFiledLength)}
                                        </td>
                                    )
                                }
                                {
                                    this.temp.cfg.customFieldList.map(cf =>
                                        <td
                                            onclick={e => this.temp.onItemClick(it, datI, cf, e.currentTarget)}>
                                            {this.temp.cfg.customFieldMap[cf][0](it, datI)}
                                        </td>
                                    )
                                }
                                {
                                    this.temp.cfg.enableOperate ?
                                        <td>
                                            {this.itemHandel(it, datI)}
                                        </td>
                                        :
                                        null
                                }

                            </tr>
                        )
                    }
                </tbody>
            }
        </table>

    /**
     * 主体
     */
    render = () =>
        <div class="pad10 flex flex-col">
            <div>
                {this.search()}

                <div class="flex-row mar10t">
                    {this.delAndAdd()}
                    {this.dataCount()}
                </div>

                {this.tbodyList =
                    <div class="flex-col mar10t">
                        {
                            this.initList([])
                        }
                    </div>
                }
                  <div class="flex-row x-center mar10t">
                    <button className="button_white pad4-10" onclick={() => this.temp.firstPage()}>
                        首页
                    </button>
                    <button className="button_white  mar5l  pad4-10" onclick={() => this.temp.prevPage()}>
                        上页
                    </button>
                    <span class=" mar5l" onclick={() => this.temp.onPageClick()}>
                        (
                    <span>{dfvBind(e => this.temp.dat.currentPage)}</span>
                        /
                    <span>{dfvBind(e => this.temp.dat.totalPage)}</span>)
                </span>
                    <button className="button_white  mar5l  pad4-10" onclick={() => this.temp.nextPage()}>
                        下页
                    </button>
                    <button className="button_white  mar5l  pad4-10" onclick={() => this.temp.lastPage()}>
                        尾页
                    </button>
                </div>

                {this.temp.loadList()}

            </div>
        </div>


    /**
     * 反转选中状态
     * @param currentTarget
     */
    checkAll() {
        for (let i = 0; i < this.tableBody.children.length; i++) {
            let row = this.tableBody.children[i] as HTMLTableRowElement;
            dfvFront.eachElement(row, (checkBox: HTMLInputElement) => {
                if (checkBox.localName == LocalName.input && checkBox.type == InputType.checkbox) {
                    checkBox.checked = this.temp.dat.checkAll != true;
                    return false;
                }
                return true;
            })
        }
    }


    private onCheckBoxClick(currentTarget: HTMLElement) {
        if (!this.temp.selectMode)
            return;

        /**
         * 单选模式，
         */
        for (let i = 0; i < this.tableBody.children.length; i++) {
            let row = this.tableBody.children[i] as HTMLTableRowElement;
            dfvFront.eachElement(row, (checkBox: HTMLInputElement) => {
                if (checkBox.localName == LocalName.input && checkBox.type == InputType.checkbox && checkBox.checked) {
                    if (checkBox != currentTarget)
                        checkBox.checked = false;
                }
            })


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
    getFieldVal(row: number, dat: T, field: string, maxNum?: number) {
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
    private _onDelClick(row?: number) {
        let list: { dat: T, index: number }[] = [];
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


    /**
     * 获取编辑字段列表
     * @param dat
     * @param fs
     * @param index
     * @returns {Promise<any[]>}
     */
    async getEditFields(dat: T | T2, fs: MapString<IListEdit<T | T2>>, index: number) {
        let ret = Array();

        for (let k in fs) {
            let edit = fs[k];
            let title = this.temp.cfg.showFieldMap[k];
            if (title == null)
                title = k;

            let showFunc = this.temp.cfg.showFunc[k];
            let showValue = dat[k];
            if (showFunc)
                showValue = showFunc(showValue, dat as T, index);

            let e: IListEditData<T | T2> = {
                dat: dat,
                dom: null,
                isEditAll: true,
                isAdd: true,
                index: index,
                field: k,
                value: dat[k],
                funcValue: showValue,
            }

            await edit.onShow(e)

            if (e.dom == null)
                continue;

            if (com.isMobile()) {
                ret.push(
                    <div class=" mar10b">
                        <div>{title}:</div>
                        <div>{e.dom}</div>
                    </div>)
            }
            else {
                ret.push(
                    <tr>
                        <td>{title}:</td>
                        <td>
                            {e.dom}
                        </td>
                    </tr>)
            }

        }
        return ret;
    }

}
