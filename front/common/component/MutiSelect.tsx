import * as React from "dfv/src/public/dfvReact";
import { dfvFront } from "dfv/src/public/dfvFront";

/**
 * 多选控件
 */
export class MutiSelect {

    constructor(public column: number, public muti = true, public onClick: (index: number) => void = () => {
    }) {

    }

    itemViews: HTMLDivElement[] = [];


    selectItems = Array<number>();

    borClass = "back_blue";

    selectAll() {
        this.selectItems.length = 0;
        for (let i = 0; i < this.itemViews.length; i++) {
            this.selectItems.push(i);
            this.itemViews[i].className += " " + this.borClass;
        }
    }

    clearSelect() {
        this.selectItems.forEach(it => {
            dfvFront.classRemove(this.itemViews[it], this.borClass);
        })
        this.selectItems.length = 0;
    }

    private _onClick(index: number) {


        if (!this.muti) {
            this.selectItems.forEach(it => {
                dfvFront.classRemove(this.itemViews[it], this.borClass);
            });
            this.selectItems.length = 0;
            this.selectItems.push(index);
            this.itemViews[index].className += " " + this.borClass
        }
        else {
            for (let i = 0; i < this.selectItems.length; i++) {
                if (this.selectItems[i] == index) {
                    this.selectItems.splice(i, 1);
                    dfvFront.classRemove(this.itemViews[index], this.borClass);
                    this.onClick(index);

                    return;
                }
            }
            this.selectItems.push(index);
            this.itemViews[index].className += " " + this.borClass
        }
        this.onClick(index);

    }

    addData(dat: any[]) {
        dfvFront.addEle(this.cont, this.getDataView(dat));
    }

    private getDataView(dat: any[]) {
        let vs = Array();
        for (let i = 0; i < dat.length; i += this.column) {
            let div = <div class="flex-row"></div>
            for (let y = 0; y < this.column; y++) {
                let index = i + y;
                let allI = this.itemViews.length;
                let v = <div class="pad8 hover_yelow flex x-center"
                    onclick={e => this._onClick(allI)}>{dat[index]}</div>;
                this.itemViews.push(v);
                dfvFront.addEle(div, v);
            }
            vs.push(div);
        }

        return vs;
    }

    setData(dat: any[]) {

        this.selectItems.length = 0;
        this.itemViews.length = 0;

        dfvFront.setEle(this.cont, this.getDataView(dat));
    }

    cont: HTMLDivElement = <div class="width_p100">
    </div>;

    render() {
        return this.cont;
    }
}
