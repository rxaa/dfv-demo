"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const AjaxRequest_1 = require("../AjaxRequest");
const apiCRUD_1 = require("..//db/apiCRUD");
const dfvFront_1 = require("dfv/src/public/dfvFront");
var UploadFileType;
(function (UploadFileType) {
    UploadFileType[UploadFileType["pic"] = 0] = "pic";
    UploadFileType[UploadFileType["video"] = 1] = "video";
    UploadFileType[UploadFileType["txt"] = 2] = "txt";
    UploadFileType[UploadFileType["other"] = 3] = "other";
})(UploadFileType = exports.UploadFileType || (exports.UploadFileType = {}));
class TempUploadEdit {
    /**
     *
     * @param validEdit  验证函数
     */
    constructor(validEdit) {
        this.validEdit = validEdit;
        this.prog = React.createElement("span", null);
    }
    getSrc() {
        if (typeof this.pic === "string" && this.pic.indexOf("http") == 0)
            return this.pic;
        return `/file/get?fid=${this.pic}`;
    }
    onShow(e) {
        this.pic = e.value;
        let src = this.getSrc();
        e.dom =
            React.createElement("div", { class: "flex-row y-center pad3" },
                this.cont = React.createElement("div", null, this.img =
                    React.createElement("img", { src: src, style: "max-width:80px;height:auto;" })),
                React.createElement("button", { class: "button_blue pad6-12 mar5l", onclick: e => this.onUpload() }, "\u4E0A\u4F20"),
                this.info = React.createElement("span", { class: "red" }));
    }
    async onValid(e) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.pic, e.dat);
            else
                e.dat[e.field] = this.pic;
            this.info.innerHTML = "";
        }
        catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }
        return true;
    }
    onUpload() {
        let dis = new AjaxRequest_1.FileSelectDialog();
        dis.setFileAccept(AjaxRequest_1.FileSelectDialog.imageType);
        dis.onSelectFile = (fi) => {
            let form = new FormData();
            form.append("file", fi);
            let req = apiCRUD_1.apiCRUD.upload(form).showProgress(false);
            dfvFront_1.dfvFront.setEle(this.cont, this.prog);
            //显示上传进度
            req.onSendProg = e => {
                this.prog.innerHTML = (e.loaded * 99 / e.total).toFixed(1) + "%";
            };
            req.resp().then(res => {
                this.pic = res.fid;
                this.img.src = this.getSrc();
                dfvFront_1.dfvFront.setEle(this.cont, this.img);
            });
        };
        dis.show();
    }
}
exports.TempUploadEdit = TempUploadEdit;
//# sourceMappingURL=TempUploadEdit.js.map