"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfvFront_1 = require("dfv/src/public/dfvFront");
/**
 * 多选控件
 */
class MutiSelect {
    constructor(column, muti = true, onClick = () => {
    }) {
        this.column = column;
        this.muti = muti;
        this.onClick = onClick;
        this.itemViews = [];
        this.selectItems = Array();
        this.borClass = "back_blue";
        this.cont = React.createElement("div", { class: "width_p100" });
    }
    selectAll() {
        this.selectItems.length = 0;
        for (let i = 0; i < this.itemViews.length; i++) {
            this.selectItems.push(i);
            this.itemViews[i].className += " " + this.borClass;
        }
    }
    clearSelect() {
        this.selectItems.forEach(it => {
            dfvFront_1.dfvFront.classRemove(this.itemViews[it], this.borClass);
        });
        this.selectItems.length = 0;
    }
    _onClick(index) {
        if (!this.muti) {
            this.selectItems.forEach(it => {
                dfvFront_1.dfvFront.classRemove(this.itemViews[it], this.borClass);
            });
            this.selectItems.length = 0;
            this.selectItems.push(index);
            this.itemViews[index].className += " " + this.borClass;
        }
        else {
            for (let i = 0; i < this.selectItems.length; i++) {
                if (this.selectItems[i] == index) {
                    this.selectItems.splice(i, 1);
                    dfvFront_1.dfvFront.classRemove(this.itemViews[index], this.borClass);
                    this.onClick(index);
                    return;
                }
            }
            this.selectItems.push(index);
            this.itemViews[index].className += " " + this.borClass;
        }
        this.onClick(index);
    }
    addData(dat) {
        dfvFront_1.dfvFront.addEle(this.cont, this.getDataView(dat));
    }
    getDataView(dat) {
        let vs = Array();
        for (let i = 0; i < dat.length; i += this.column) {
            let div = React.createElement("div", { class: "flex-row" });
            for (let y = 0; y < this.column; y++) {
                let index = i + y;
                let allI = this.itemViews.length;
                let v = React.createElement("div", { class: "pad8 hover_yelow flex x-center", onclick: e => this._onClick(allI) }, dat[index]);
                this.itemViews.push(v);
                dfvFront_1.dfvFront.addEle(div, v);
            }
            vs.push(div);
        }
        return vs;
    }
    setData(dat) {
        this.selectItems.length = 0;
        this.itemViews.length = 0;
        dfvFront_1.dfvFront.setEle(this.cont, this.getDataView(dat));
    }
    render() {
        return this.cont;
    }
}
exports.MutiSelect = MutiSelect;
//# sourceMappingURL=MutiSelect.js.map