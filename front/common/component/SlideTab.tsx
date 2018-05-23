import * as React from "dfv/src/public/dfvReact";

export type SlideTabData = Array<[string, (i: number) => void]>;

/**
 * 横向滑动菜单
 */
export class SlideTab {

    titles = Array<string>();
    items: Array<HTMLSpanElement> = [];
    lineView: HTMLDivElement;
    data: SlideTabData;
    backView: HTMLDivElement;
    currentSelect = 0;


    render(data: SlideTabData) {
        this.data = data;
        this.titles = data.map(it => it[0]);


        this.backView = <div class="back_navy_blue a_white blod">
            <div class="flex-row">
                {this.items = data.map((it, i) =>
                    <nav class="hover_yelow pad10 inline flex x-center" onclick={e => this.onItemClick(i)}>
                        {it[0]}
                    </nav>
                )}
            </div>
            {this.lineView = <div class="white_line width_0 anim_left_width" />}
        </div>

        if (data.length > 0) {
            setTimeout(() => {
                this.onItemClick(0)
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

    private onItemClick(i: number) {
        this.currentSelect = i;
        let item = this.items[i];
        this.data[i][1](i);

        this.lineView.style.width = item.offsetWidth + "px";
        this.lineView.style.marginLeft = (item.offsetLeft - this.backView.offsetLeft) + "px";

        this.items.forEach(it => {
            it.style.color = "";
        })
        item.style.color = "#ffe8ac";
    }
}