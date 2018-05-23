"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const AjaxRequest_1 = require("../../front/AjaxRequest");
const apiCRUD_1 = require("../../front/db/apiCRUD");
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
    onValid(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validEdit)
                    e.dat[e.field] = yield this.validEdit(this.pic, e.dat);
                else
                    e.dat[e.field] = this.pic;
                this.info.innerHTML = "";
            }
            catch (err) {
                this.info.innerHTML = err.message;
                return false;
            }
            return true;
        });
    }
    onUpload() {
        let dis = new AjaxRequest_1.FileSelectDialog();
        dis.setFileAccept(AjaxRequest_1.FileSelectDialog.imageType);
        dis.onSelectFile = (fi) => __awaiter(this, void 0, void 0, function* () {
            let form = new FormData();
            form.set("file", fi);
            let req = apiCRUD_1.apiCRUD.upload(form).showProgress(false);
            dfvFront_1.dfvFront.setEle(this.cont, this.prog);
            //显示上传进度
            req.onSendProg = e => {
                this.prog.innerHTML = (e.loaded * 99 / e.total).toFixed(1) + "%";
            };
            let res = yield req.resp();
            this.pic = res.fid;
            this.img.src = this.getSrc();
            dfvFront_1.dfvFront.setEle(this.cont, this.img);
        });
        dis.show();
    }
}
exports.TempUploadEdit = TempUploadEdit;
//# sourceMappingURL=TempUploadEdit.js.map