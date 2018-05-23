import * as React from "dfv/src/public/dfvReact";
import { IListEdit, IListEditData } from "./ListTemp";


export class TempTextEdit<T> implements IListEdit<T> {


    /**
     *
     * @param validEdit  验证函数
     */
    constructor(public validEdit?: (val: any, dat: T) => any) {

    }

    info: HTMLSpanElement;

    text: HTMLTextAreaElement;

    onShow(e: IListEditData<T>) {
        if (e.isEditAll) {
            e.dom =
                <div class="flex-row y-center">
                    {this.text =
                        <textarea class="txt_blue" style={{ width: "100%" }}
                            onblur={ev => this.onValid(e)}>
                            {e.funcValue}
                        </textarea>
                    }
                    {this.info = <span class="red" />}
                </div>
        }
        else {
            e.dom =
                <div class="flex-col y-center">
                    {this.text =
                        <textarea class="txt_blue" style={{ width: "180px", height: "80px" }}>
                            {e.funcValue}
                        </textarea>
                    }
                    {this.info = <span class="red" />}
                </div>

            setTimeout(() => {
                this.text.focus();
            }, 0);
        }


    }

    async onValid(e: IListEditData<T>) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.text.value, e.dat);
            else
                e.dat[e.field] = this.text.value;

            this.info.innerHTML = ""
        } catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }

        return true;
    }


}