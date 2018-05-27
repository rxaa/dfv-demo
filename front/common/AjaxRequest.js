"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfvFront_1 = require("dfv/src/public/dfvFront");
const dfv_1 = require("dfv/src/public/dfv");
/**
 * 文件上传对话框
 */
class FileSelectDialog {
    constructor() {
        this.fileInput = document.createElement("input");
        this.onSelectFile = (res) => {
        };
        this.fileInput.type = "file";
        this.fileInput.style.width = "1px";
        this.fileInput.style.height = "1px";
        this.fileInput.style.position = "fixed";
        this.fileInput.style.opacity = "0";
        document.body.appendChild(this.fileInput);
    }
    setFileAccept(accept) {
        this.fileInput.accept = accept;
    }
    show() {
        this.fileInput.onchange = e => {
            let file = this.fileInput.files[0];
            document.body.removeChild(this.fileInput);
            if (this.onSelectFile)
                this.onSelectFile(file);
        };
        this.fileInput.click();
    }
}
FileSelectDialog.imageArr = [".jpeg", ".jpg", ".bmp", ".png"];
FileSelectDialog.imageType = FileSelectDialog.imageArr.join(",");
FileSelectDialog.txtArr = [".xls", ".doc", ".txt", ".pdf"];
FileSelectDialog.txtType = FileSelectDialog.txtArr.join(",");
FileSelectDialog.videoArr = [".mp4", ".mpeg", ".wmv", ".avi"];
FileSelectDialog.videoType = FileSelectDialog.videoArr.join(",");
exports.FileSelectDialog = FileSelectDialog;
/**
 * ajax请求
 */
class AjaxRequest {
    constructor(url, clas) {
        this.url = url;
        this.clas = clas;
        this.http = new XMLHttpRequest();
        this.failedMsg = true;
        this.loadProgress = true;
        /**
         * sendJSON()get或post参数
         */
        this.paraObj = null;
        /**
         * 是否get请求
         */
        this.notPost = false;
        /**
         * 上传进度
         */
        this.onSendProg = (ev) => {
        };
        /**
         * 下载进度
         */
        this.onRespProg = (ev) => {
        };
        try {
            this.http.timeout = 15 * 1000;
        }
        catch (e) {
        }
    }
    setContentTypeJSON() {
        this.http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        return this;
    }
    setContentTypeForm() {
        this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        return this;
    }
    /**
     * 是否显示错误提示与进度条
     * @param enable
     * @returns {AjaxLoad}
     */
    msgProgress(enable) {
        this.failedMsg = enable;
        this.loadProgress = enable;
        return this;
    }
    showMsg(enable) {
        this.failedMsg = enable;
        return this;
    }
    showProgress(enable) {
        this.loadProgress = enable;
        return this;
    }
    /**
     * 获取sendJSON()请求的结果
     * @returns {Promise<T>}
     */
    resp() {
        if (this.loadProgress)
            dfvFront_1.dfvFront.loadStart();
        return new Promise((reso, reject) => {
            this.procRes(res => {
                if (this.loadProgress) {
                    dfvFront_1.dfvFront.loadStop();
                }
                let resp = null;
                let err = null;
                if (res.status == 200) {
                    try {
                        resp = JSON.parse(res.responseText);
                        if (this.clas)
                            dfv_1.dfv.setPrototypeOf(resp, this.clas.prototype);
                    }
                    catch (e) {
                        resp = res.responseText;
                    }
                }
                else {
                    if (res.responseText && res.responseText.length > 0)
                        err = Error(res.responseText);
                    else
                        err = Error(res.status + "网络异常!");
                }
                if (res.status == 200) {
                    reso(resp);
                }
                else {
                    if (this.failedMsg) {
                        dfvFront_1.dfvFront.msgErr(err.message);
                    }
                    reject(resp);
                }
            });
            this.httpSend();
        });
    }
    /**
     * 根据paraObj参数构造http请求
     */
    httpSend() {
        if (this.formData) {
            this.http.open("POST", this.url, true);
            this.http.send(this.formData);
            return;
        }
        if (this.notPost) {
            if (this.paraObj)
                this.http.open("GET", this.url + "?" + dfvFront_1.dfvFront.objToForm(this.paraObj), true);
            else
                this.http.open("GET", this.url, true);
            this.http.send(null);
        }
        else {
            this.http.open("POST", this.url, true);
            this.setContentTypeJSON();
            this.http.send(JSON.stringify(this.paraObj));
        }
    }
    /**
     * 设置http请求入参
     * @param obj
     * @param notPost
     * @returns {AjaxLoad}
     */
    sendJSON(obj, notPost) {
        if (obj) {
            if (!this.paraObj) {
                this.paraObj = {};
            }
            for (let key in obj) {
                this.paraObj[key] = obj[key];
            }
        }
        this.notPost = !!notPost;
        return this;
    }
    sendForm(form) {
        if (this.paraObj) {
            for (let key in this.paraObj) {
                form.append(key, this.paraObj[key]);
            }
        }
        this.formData = form;
        return this;
    }
    get(onRes) {
        this.procRes(onRes);
        this.http.open("GET", this.url, true);
        return this;
    }
    post(val, onRes) {
        this.procRes(onRes);
        this.http.open("POST", this.url, true);
        this.http.send(val);
        return this;
    }
    procRes(onRes) {
        this.http.onreadystatechange = (ev) => {
            if (this.http.readyState == 4) {
                if (onRes) {
                    try {
                        onRes(this.http);
                    }
                    catch (e) {
                        dfvFront_1.dfvFront.onCatchError(e);
                    }
                }
            }
        };
        this.http.onprogress = this.onRespProg;
        this.http.upload.onprogress = this.onSendProg;
    }
}
exports.AjaxRequest = AjaxRequest;
//# sourceMappingURL=AjaxRequest.js.map