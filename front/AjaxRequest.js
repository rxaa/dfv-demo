"use strict";
exports.__esModule = true;
var dfvFront_1 = require("dfv/src/public/dfvFront");
var dfv_1 = require("dfv/src/public/dfv");
var AjaxRequest = (function () {
    function AjaxRequest(url, clas) {
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
        this.onSendProg = function (ev) {
        };
        /**
         * 下载进度
         */
        this.onRespProg = function (ev) {
        };
        try {
            this.http.timeout = 15 * 1000;
        }
        catch (e) {
        }
    }
    AjaxRequest.prototype.setContentTypeJSON = function () {
        this.http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        return this;
    };
    AjaxRequest.prototype.setContentTypeForm = function () {
        this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        return this;
    };
    /**
     * 是否显示错误提示与进度条
     * @param enable
     * @returns {AjaxLoad}
     */
    AjaxRequest.prototype.msgProgress = function (enable) {
        this.failedMsg = enable;
        this.loadProgress = enable;
        return this;
    };
    AjaxRequest.prototype.showMsg = function (enable) {
        this.failedMsg = enable;
        return this;
    };
    AjaxRequest.prototype.showProgress = function (enable) {
        this.loadProgress = enable;
        return this;
    };
    /**
     * 获取sendJSON()请求的结果
     * @returns {Promise<T>}
     */
    AjaxRequest.prototype.resp = function () {
        var _this = this;
        if (this.loadProgress)
            dfvFront_1.dfvFront.loadStart();
        return new Promise(function (reso, reject) {
            _this.procRes(function (res) {
                if (_this.loadProgress) {
                    dfvFront_1.dfvFront.loadStop();
                }
                var resp = null;
                var err = null;
                if (res.status == 200) {
                    resp = JSON.parse(res.responseText);
                    if (_this.clas)
                        dfv_1.dfv.setPrototypeOf(resp, _this.clas.prototype);
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
                    if (_this.failedMsg) {
                        dfvFront_1.dfvFront.msgErr(err.message);
                    }
                    reject(resp);
                }
            });
            _this.httpSend();
        });
    };
    /**
     * 根据paraObj参数构造http请求
     */
    AjaxRequest.prototype.httpSend = function () {
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
    };
    /**
     * 设置http请求入参
     * @param obj
     * @param notPost
     * @returns {AjaxLoad}
     */
    AjaxRequest.prototype.sendJSON = function (obj, notPost) {
        if (obj) {
            if (!this.paraObj) {
                this.paraObj = {};
            }
            for (var key in obj) {
                this.paraObj[key] = obj[key];
            }
        }
        this.notPost = !!notPost;
        return this;
    };
    AjaxRequest.prototype.get = function (onRes) {
        this.procRes(onRes);
        this.http.open("GET", this.url, true);
        return this;
    };
    AjaxRequest.prototype.post = function (val, onRes) {
        this.procRes(onRes);
        this.http.open("POST", this.url, true);
        this.http.send(val);
        return this;
    };
    AjaxRequest.prototype.procRes = function (onRes) {
        var _this = this;
        this.http.onreadystatechange = function (ev) {
            if (_this.http.readyState == 4) {
                if (onRes) {
                    try {
                        onRes(_this.http);
                    }
                    catch (e) {
                        dfvFront_1.dfvFront.onCatchError(e);
                    }
                }
            }
        };
        this.http.onprogress = this.onRespProg;
        this.http.upload.onprogress = this.onSendProg;
    };
    return AjaxRequest;
}());
exports.AjaxRequest = AjaxRequest;
