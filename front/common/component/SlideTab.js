"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
class SlideTab {
    constructor() {
        this.titles = Array();
        this.items = [];
        this.currentSelect = 0;
    }
    render(data) {
        this.data = data;
        this.titles = data.map(it => it[0]);
        this.backView = React.createElement("div", { class: "back_navy_blue a_white blod" },
            React.createElement("div", { class: "flex-row" }, this.items = data.map((it, i) => React.createElement("nav", { class: "hover_yelow pad10 inline flex x-center", onclick: e => this.onItemClick(i) }, it[0]))),
            this.lineView = React.createElement("div", { class: "white_line width_0 anim_left_width" }));
        if (data.length > 0) {
            setTimeout(() => {
                this.onItemClick(0);
            }, 0);
        }
        return this.backView;
    }
    refresh() {
        if (this.currentSelect >= 0) {
            let item = this.items[this.currentSelect];
            this.data[this.currentSelect][1](this.currentSelect);
        }
    }
    onItemClick(i) {
        this.currentSelect = i;
        let item = this.items[i];
        this.data[i][1](i);
        this.lineView.style.width = item.offsetWidth + "px";
        this.lineView.style.marginLeft = (item.offsetLeft - this.backView.offsetLeft) + "px";
        this.items.forEach(it => {
            it.style.color = "";
        });
        item.style.color = "#ffe8ac";
    }
}
exports.SlideTab = SlideTab;
//# sourceMappingURL=SlideTab.js.map