import { dfvFront } from "dfv/src/public/dfvFront";
import { dfv } from "dfv/src/public/dfv";

/**
 * 文件上传对话框
 */
export class FileSelectDialog {
    fileInput = document.createElement("input");

    constructor() {
        this.fileInput.type = "file";
        this.fileInput.style.width = "1px";
        this.fileInput.style.height = "1px";
        this.fileInput.style.position = "fixed";
        this.fileInput.style.opacity = "0"
        document.body.appendChild(this.fileInput);

    }

    setFileAccept(accept: string) {
        this.fileInput.accept = accept;
    }


    static imageArr = [".jpeg", ".jpg", ".bmp", ".png"];
    static imageType = FileSelectDialog.imageArr.join(",");

    static txtArr = [".xls", ".doc", ".txt", ".pdf"]
    static txtType = FileSelectDialog.txtArr.join(",");

    static videoArr = [".mp4", ".mpeg", ".wmv", ".avi"];
    static videoType = FileSelectDialog.videoArr.join(",");



    onSelectFile = (res: File) => {

    }

    show() {
        this.fileInput.onchange = e => {
            let file = this.fileInput!.files![0];
            document.body.removeChild(this.fileInput);
            if (this.onSelectFile)
                this.onSelectFile(file);
        }
        this.fileInput.click();
    }

}

/**
 * ajax请求
 */
export class AjaxRequest<T> {

    http = new XMLHttpRequest();

    /**
     * 文件表单
     */
    formData: FormData;

    constructor(public url: string, public clas?: { new(): T }) {
        try {
            this.http.timeout = 15 * 1000;
        } catch (e) {
        }
    }

    setContentTypeJSON(): this {
        this.http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        return this;
    }

    setContentTypeForm(): this {
        this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        return this;
    }


    failedMsg = true;
    loadProgress = true;

    /**
     * 是否显示错误提示与进度条
     * @param enable
     * @returns {AjaxLoad}
     */
    msgProgress(enable: boolean): this {
        this.failedMsg = enable;
        this.loadProgress = enable;
        return this;
    }

    showMsg(enable: boolean): this {
        this.failedMsg = enable;
        return this;
    }

    showProgress(enable: boolean): this {
        this.loadProgress = enable;
        return this;
    }

    /**
     * sendJSON()get或post参数
     */
    paraObj: Object | null = null;
    /**
     * 是否get请求
     */
    notPost: boolean = false;

    /**
     * 获取sendJSON()请求的结果
     * @returns {Promise<T>}
     */
    resp(): Promise<T> {
        if (this.loadProgress)
            dfvFront.loadStart();
        return new Promise<T>((reso, reject) => {
            this.procRes(res => {
                if (this.loadProgress) {
                    dfvFront.loadStop();
                }
                let resp: any = null;
                let err: Error | null = null;
                if (res.status == 200) {
                    try {
                        resp = JSON.parse(res.responseText);
                        if (this.clas)
                            dfv.setPrototypeOf(resp, this.clas.prototype);
                    } catch (e) {
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
                    reso(resp)
                }
                else {
                    if (this.failedMsg) {
                        dfvFront.msgErr(err!.message);
                    }
                    reject(resp);
                }
            });
            this.httpSend()
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
                this.http.open("GET", this.url + "?" + dfvFront.objToForm(this.paraObj), true);
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
    sendJSON(obj: Object | null, notPost?: boolean): this {
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

    sendForm(form: FormData): this {
        if (this.paraObj) {
            for (let key in this.paraObj) {
                form.append(key, this.paraObj[key]);
            }
        }
        this.formData = form;
        return this;
    }

    get(onRes?: (res: XMLHttpRequest) => void): this {
        this.procRes(onRes);
        this.http.open("GET", this.url, true);
        return this;
    }

    post(val: string, onRes?: (res: XMLHttpRequest) => void): this {
        this.procRes(onRes);
        this.http.open("POST", this.url, true);
        this.http.send(val);
        return this;
    }


    /**
     * 上传进度
     */
    onSendProg = (ev: ProgressEvent) => {
    }

    /**
     * 下载进度
     */
    onRespProg = (ev: ProgressEvent) => {
    }

    procRes(onRes?: (res: XMLHttpRequest) => void) {

        this.http.onreadystatechange = (ev) => {
            if (this.http.readyState == 4) {
                if (onRes) {
                    try {
                        onRes(this.http);
                    } catch (e) {
                        dfvFront.onCatchError(e);
                    }
                }
            }
        };
        this.http.onprogress = this.onRespProg;
        this.http.upload.onprogress = this.onSendProg;


    }
}