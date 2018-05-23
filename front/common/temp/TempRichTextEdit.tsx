import * as React from "dfv/src/public/dfvReact";
import { IListEdit, IListEditData } from "./ListTemp";
import { dfv } from "dfv/src/public/dfv";
import { UploadRes } from "./SelectReq";
import { dfvFront } from "dfv/src/public/dfvFront";
import { frontCfg } from "../../../config/frontCfg";
import { RichText } from "./RichText";


export class TempRichTextEdit<T> implements IListEdit<T> {


    /**
     *
     * @param validEdit  验证函数
     */
    constructor(public validEdit?: (val: any, dat: T) => any) {

    }

    info: HTMLSpanElement;

    editor = new RichText();

    onShow(e: IListEditData<T>) {
        this.editor.onBlur = () => {
            this.onValid(e);
        }

        this.editor.onInit = () => {
            this.fullScreenA = <a onclick={e => this.toggleFullscreen()} href="###" >全屏</a>
            this.editor.addToolBarItem(this.fullScreenA);
            this.editor.setHtml(e.funcValue);
        }

        if (e.isEditAll) {
            e.dom =
                <div class="flex-row y-center">
                    {this.editor.render({
                        style: { width: "100%" },
                    })}
                    {this.info = <span class="red" />}
                </div>
        }
        else {
            e.dom =
                <div class="flex-col y-center">
                    {this.editor.render({
                        style: { width: "100%" },
                    })}
                    {this.info = <span class="red" />}
                </div>

            setTimeout(() => {

                //this.text.focus();
            }, 0);
        }

    }


    fullScreenA: HTMLAnchorElement;

    toggleFullscreen() {
        if (this.fullScreenA.innerHTML == "全屏") {
            this.fullScreenA.innerHTML = "退出全屏";
            this.editor.dom.className += " fullscreen-editor";
        }
        else {
            this.fullScreenA.innerHTML = "全屏"
            dfvFront.classRemove(this.editor.dom, "fullscreen-editor");
        }
    }



    async onValid(e: IListEditData<T>) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.editor.getHtml(), e.dat);
            else
                e.dat[e.field] = this.editor.getHtml();;

            this.info.innerHTML = ""
        } catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }

        return true;
    }


}