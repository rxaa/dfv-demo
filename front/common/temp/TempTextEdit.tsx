import * as React from "dfv/src/public/dfvReact";
import { IListEdit, IListEditData } from "./ListTemp";


export class TempTextEdit<T> implements IListEdit<T> {


    /**
     * 
     * @param validEdit 验证函数
     * @param password 是否作为密码输入框
     */
    constructor(public para: {
        validEdit?: (val: any, e: IListEditData<T>) => any,
        password?: boolean,
        notShowValue?: boolean,
    } = {}) {

    }

    info: HTMLSpanElement;

    text: HTMLTextAreaElement;

    onShow(e: IListEditData<T>) {
        if (e.isEditAll) {
            e.dom =
                <div class="flex-row y-center">
                    {this.text =
                        this.para.password ?
                            <input type="password" class="txt_blue" style={{ width: "100%" }}
                                onblur={ev => this.onValid(e)}>
                            </input>
                            :
                            <textarea class="txt_blue" style={{ width: "100%" }}
                                onblur={ev => this.onValid(e)}>
                                {this.para.notShowValue ? "" : e.funcValue}
                            </textarea>
                    }
                    {this.info = <span class="red" />}
                </div>
        }
        else {
            e.dom =
                <div class="flex-col y-center">
                    {this.text =
                        this.para.password ?
                            <input type="password" class="txt_blue" style={{ width: "180px", height: "80px" }}
                                onblur={ev => this.onValid(e)}>
                            </input>
                            :
                            <textarea class="txt_blue" style={{ width: "180px", height: "80px" }}>
                                {this.para.notShowValue ? "" : e.funcValue}
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
            if (this.para.validEdit)
                e.dat[e.field] = await this.para.validEdit(this.text.value, e);
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