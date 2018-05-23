import * as React from "dfv/src/public/dfvReact";
import { IListEdit, IListEditData } from "./ListTemp";
import { MapNumber, MapString } from "dfv/src/public/dfv";


export class TempSelectEdit<T> implements IListEdit<T> {
    /**
     *
     * @param list 内容数组
     * @param validEdit  验证函数
     */
    constructor(public list: Array<any> | MapString<any> | MapNumber<any>
        , public validEdit?: (val: any, dat: T) => any) {

    }

    info: HTMLSpanElement;

    selec: HTMLSelectElement;


    onShow(e: IListEditData<T>) {
        let list = Array();
        if (this.list instanceof Array) {
            list = this.list.map((it, i) => <option value={i} selected={i == e.value}>{it}</option>)
        }
        else {
            for (let id in this.list) {
                list.push(
                    <option value={id} selected={id == e.value}>{this.list[id]}</option>
                )
            }
        }


        e.dom =
            <div class="flex-row y-center pad3">
                {this.selec =
                    <select class="txt_blue" style={{ width: "100%" }}>
                        {list}
                    </select>
                }
                {this.info = <span class="red" />}
            </div>

    }

    async onValid(e: IListEditData<T>) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.selec.value, e.dat);
            else
                e.dat[e.field] = this.selec.value;

            this.info.innerHTML = ""
        } catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }

        return true;
    }
}