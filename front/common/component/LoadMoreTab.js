"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfvFront_1 = require("dfv/src/public/dfvFront");
/**
 * 加载更多,按钮
 */
class LoadMoreTab {
    constructor(onLoadClick, hide = false) {
        this.onLoadClick = onLoadClick;
        this.hide = hide;
    }
    render() {
        this.cont = React.createElement("div", { class: "mar10t width_p100" });
        if (!this.hide)
            this.hasMore();
        return this.cont;
    }
    hasMore() {
        dfvFront_1.dfvFront.setEle(this.cont, React.createElement("button", { class: "button_blue width_p100 pad8", onclick: e => this.onLoadClick() }, "\u52A0\u8F7D\u66F4\u591A"));
    }
    noMore() {
        dfvFront_1.dfvFront.setEle(this.cont, React.createElement("div", { class: "back_yellow h_m pad5" }, "\u6CA1\u6709\u4E86"));
    }
}
exports.LoadMoreTab = LoadMoreTab;
//# sourceMappingURL=LoadMoreTab.js.map