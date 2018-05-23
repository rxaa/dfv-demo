import * as React from "dfv/src/public/dfvReact";
import { dfvFront } from "dfv/src/public/dfvFront";

/**
 * 加载更多,按钮
 */
export class LoadMoreTab {

    constructor(public onLoadClick: () => void, public hide = false) {

    }

    cont: HTMLDivElement;

    render() {
        this.cont = <div class="mar10t width_p100">
        </div>

        if (!this.hide)
            this.hasMore();
        return this.cont;
    }


    hasMore() {
        dfvFront.setEle(this.cont, <button class="button_blue width_p100 pad8" onclick={e => this.onLoadClick()}>
            加载更多
        </button>)

    }

    noMore() {
        dfvFront.setEle(this.cont, <div class="back_yellow h_m pad5">
            没有了
        </div>)

    }
}
