import * as React from "dfv/src/public/dfvReact";
import { MapString } from "dfv/src/public/dfv";
import { dfvFront } from "dfv/src/public/dfvFront";

export type TreeMenuData = MapString<Array<[string, (e: HTMLElement) => void]>>;

/**
 * 树形选择菜单
 */
export class TreeMenu {
    constructor() {
    }

    menu = {} as TreeMenuData;

    foldMenu(e: HTMLElement, arrow: HTMLElement) {
        if (e.style.height == "") {
            e.style.height = e.clientHeight + "px";
        }

        if (e.clientHeight > 0) {
            arrow.className += " anmi_rotate-90";
            e.className += " anim_out ";
            dfvFront.classRemove(e, "anim_in");
            if (!e["oldH"])
                e["oldH"] = e.clientHeight;
            e.style.height = "0px"
        }
        else {
            dfvFront.classRemove(e, "anim_out");
            dfvFront.classRemove(arrow, "anmi_rotate-90");
            e.className += " anim_in";
            e.style.height = e["oldH"] + "px"
        }
    }


    onItemClick(event: (e: HTMLElement) => void) {

    }

    itemClick(e: HTMLElement, val: [string, (e: HTMLElement) => void]) {
        this.arrItems.forEach(it => {
            dfvFront.classRemove(it, "ba_blue");
        })
        e.className += " ba_blue";

        val[1](e);

        this.onItemClick(val[1])
    }

    arrItems = Array<HTMLElement>();

    initItem(menu: TreeMenuData) {
        this.menu = menu;
        let arr = Array();

        for (let name in menu) {
            let val = menu[name];
            let cont: HTMLElement
            let icon: HTMLElement
            arr.push(
                <div>
                    <div class="pad6-12 ba_dark yellow2 hover_white" onclick={e => this.foldMenu(cont, icon)}>
                        {icon = <tt class="mar5r">▼</tt>}{name}
                    </div>
                    {cont = <div class="anim_height">
                        {
                            val.map((it) => {
                                let item =
                                    <div class="pad6-12 ba_dark2 white hover_white"
                                        onclick={e => this.itemClick(e.currentTarget, it)}>
                                        {it[0]}
                                    </div>
                                this.arrItems.push(item);
                                return item;
                            })
                        }
                    </div>}
                </div>
            )
        }

        return arr;
    }

    mainView: HTMLDivElement;

    render = (menu: TreeMenuData) => this.mainView =
        <div class="ba_dark2 height_p100">
            {this.initItem(menu)}
        </div>
}
