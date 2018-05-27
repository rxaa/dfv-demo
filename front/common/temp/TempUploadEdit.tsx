import * as React from "dfv/src/public/dfvReact";
import { IListEdit, IListEditData } from "./ListTemp";
import { FileSelectDialog } from "../AjaxRequest";
import { apiCRUD } from "..//db/apiCRUD";
import { dfvFront } from "dfv/src/public/dfvFront";


export enum UploadFileType {
    pic,
    video,
    txt,
    other,
}

export class TempUploadEdit<T> implements IListEdit<T> {
    /**
     *
     * @param validEdit  验证函数
     */
    constructor(public validEdit?: (val: any, dat: T) => any) {

    }

    info: HTMLSpanElement;

    img: HTMLImageElement;

    prog = <span></span>
    cont: HTMLDivElement;

    public pic: string | number;

    getSrc() {
        if (typeof this.pic === "string" && this.pic.indexOf("http") == 0)
            return this.pic;

        return `/file/get?fid=${this.pic}`;
    }


    onShow(e: IListEditData<T>) {
        this.pic = e.value;

        let src = this.getSrc();

        e.dom =
            <div class="flex-row y-center pad3">
                {this.cont = <div>
                    {this.img =
                        <img src={src} style="max-width:80px;height:auto;" />
                    }
                </div>}
                <button class="button_blue pad6-12 mar5l" onclick={e => this.onUpload()}>上传</button>
                {this.info = <span class="red" />}
            </div>
    }

    async onValid(e: IListEditData<T>) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.pic, e.dat);
            else
                e.dat[e.field] = this.pic;

            this.info.innerHTML = ""
        } catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }

        return true;
    }

    private onUpload() {
        let dis = new FileSelectDialog();
        dis.setFileAccept(FileSelectDialog.imageType);

        dis.onSelectFile = (fi) => {
            let form = new FormData();
            form.append("file", fi);
            let req = apiCRUD.upload(form).showProgress(false);
            dfvFront.setEle(this.cont, this.prog);
            //显示上传进度
            req.onSendProg = e => {
                this.prog.innerHTML = (e.loaded * 99 / e.total).toFixed(1) + "%";
            }
            req.resp().then(res => {
                this.pic = res.fid;
                this.img.src = this.getSrc();
                dfvFront.setEle(this.cont, this.img);
            })
        };

        dis.show();
    }
}