import { frontCfg } from "../../../config/frontCfg";
import { __React } from "dfv/src/reactExp";
import * as React from "dfv/src/public/dfvReact";

export class LayDateDfv {
    static hasLoad = false;
    dom: HTMLInputElement;
    constructor() {
        if (!LayDateDfv.hasLoad) {
            //加载js文件
            var script = document.createElement("script");
            script.async = false;  // 关闭异步加载，不是所有浏览都支持
            script.setAttribute('src', frontCfg.layDatePath);
            document.head!.appendChild(script);

            LayDateDfv.hasLoad = true;
        }
    }

    render(style: __React.HTMLAttributes = {}) {
        this.dom = <input type="text" class="txt_blue" readOnly={true} {...style} />
        this.initDiv(this.dom);
        return this.dom
    }

    initDiv(ele: string | HTMLInputElement) {

        var E = (window as any).laydate;

        if (E === undefined || !this.dom.parentElement) {
            //异步加载，需要多次尝试
            setTimeout(() => {
                this.initDiv(ele);
            }, 20);
            return;
        }

        laydate.render({
            elem: this.dom,
            done: (d, date, endDate) => this.onSelected(d, date, endDate),
            theme: frontCfg.mainColor,
        });

        this.onInit();
    }

    getDate() {

    }
    setDate(time: string) {
        this.dom.value = time;
    }

    onSelected(value: string, date: LaydateDate, endDate: LaydateDate) {

    }
    /**
     * 初始化成功回调（当异步加载js文件未完成时，setHtml getHtml以及addToolBarItem函数会调用失败）
     */
    onInit() {

    }

}