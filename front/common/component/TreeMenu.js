"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfvFront_1 = require("dfv/src/public/dfvFront");
class TreeMenu {
    constructor() {
        this.menu = {};
        this.arrItems = Array();
        this.render = (menu) => this.mainView =
            React.createElement("div", { class: "ba_dark2 height_p100" }, this.initItem(menu));
    }
    foldMenu(e, arrow) {
        if (e.style.height == "") {
            e.style.height = e.clientHeight + "px";
        }
        if (e.clientHeight > 0) {
            arrow.className += " anmi_rotate-90";
            e.className += " anim_out ";
            dfvFront_1.dfvFront.classRemove(e, "anim_in");
            if (!e["oldH"])
                e["oldH"] = e.clientHeight;
            e.style.height = "0px";
        }
        else {
            dfvFront_1.dfvFront.classRemove(e, "anim_out");
            dfvFront_1.dfvFront.classRemove(arrow, "anmi_rotate-90");
            e.className += " anim_in";
            e.style.height = e["oldH"] + "px";
        }
    }
    onItemClick(event) {
    }
    itemClick(e, val) {
        this.arrItems.forEach(it => {
            dfvFront_1.dfvFront.classRemove(it, "ba_blue");
        });
        e.className += " ba_blue";
        val[1](e);
        this.onItemClick(val[1]);
    }
    initItem(menu) {
        this.menu = menu;
        let arr = Array();
        for (let name in menu) {
            let val = menu[name];
            let cont;
            let icon;
            arr.push(React.createElement("div", null,
                React.createElement("div", { class: "pad6-12 ba_dark yellow2 hover_white", onclick: e => this.foldMenu(cont, icon) },
                    icon = React.createElement("tt", { class: "mar5r" }, "\u25BC"),
                    name),
                cont = React.createElement("div", { class: "anim_height" }, val.map((it) => {
                    let item = React.createElement("div", { class: "pad6-12 ba_dark2 white hover_white", onclick: e => this.itemClick(e.currentTarget, it) }, it[0]);
                    this.arrItems.push(item);
                    return item;
                }))));
        }
        return arr;
    }
}
exports.TreeMenu = TreeMenu;
//# sourceMappingURL=TreeMenu.js.map