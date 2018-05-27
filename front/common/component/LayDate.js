"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontCfg_1 = require("../../../config/frontCfg");
const React = require("dfv/src/public/dfvReact");
class LayDateDfv {
    constructor() {
        if (!LayDateDfv.hasLoad) {
            //加载js文件
            var script = document.createElement("script");
            script.async = false; // 关闭异步加载，不是所有浏览都支持
            script.setAttribute('src', frontCfg_1.frontCfg.layDatePath);
            document.head.appendChild(script);
            LayDateDfv.hasLoad = true;
        }
    }
    render(style = {}) {
        this.dom = React.createElement("input", Object.assign({ type: "text", class: "txt_blue", readOnly: true }, style));
        this.initDiv(this.dom);
        return this.dom;
    }
    initDiv(ele) {
        var E = window.laydate;
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
            theme: frontCfg_1.frontCfg.mainColor,
        });
        this.onInit();
    }
    getDate() {
    }
    setDate(time) {
        this.dom.value = time;
    }
    onSelected(value, date, endDate) {
    }
    /**
     * 初始化成功回调（当异步加载js文件未完成时，setHtml getHtml以及addToolBarItem函数会调用失败）
     */
    onInit() {
    }
}
LayDateDfv.hasLoad = false;
exports.LayDateDfv = LayDateDfv;
//# sourceMappingURL=LayDate.js.map