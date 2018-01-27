"use strict";
exports.__esModule = true;
var dfv_1 = require("dfv/src/public/dfv");
var dfvFront_1 = require("dfv/src/public/dfvFront");
var LoadEvent = (function () {
    function LoadEvent(dat, type) {
        this.type = LoadEvent.funcEvent;
        this.dat = "";
        this.dat = dat;
        this.type = type;
    }
    /**
     * push设置新页面
     * @param func
     * @param url
     */
    LoadEvent.pushFunc = function (func, url) {
        //修复初始时空state
        if (window.history.state == null) {
            LoadEvent.replaceFunc(func);
            return;
        }
        if (url == null) {
            url = "#" + dfv_1.dfv.getUniqueId16();
        }
        try {
            func();
            if (url && window.history.pushState)
                window.history.pushState(LoadEvent.func(func), "", url);
        }
        catch (e) {
            dfvFront_1.dfvFront.onCatchError(e);
        }
    };
    LoadEvent.func = function (func) {
        var id = dfv_1.dfv.getUniqueId16();
        LoadEvent.funcMap[id] = func;
        return new LoadEvent(id, LoadEvent.funcEvent);
    };
    LoadEvent.newBody = function (dat) {
        return new LoadEvent(dat, LoadEvent.loadBodyEvent);
    };
    LoadEvent.procLoadEvent = function (dat) {
        if (dat.type > LoadEvent.invalid && dat.type < LoadEvent.procArr.length) {
            LoadEvent.procArr[dat.type](dat);
        }
    };
    LoadEvent.replaceFunc = function (func) {
        try {
            func();
            if (window.history.replaceState)
                window.history.replaceState(LoadEvent.func(func), "");
        }
        catch (e) {
            dfvFront_1.dfvFront.onCatchError(e);
        }
    };
    LoadEvent.invalid = 0;
    LoadEvent.funcEvent = 1;
    LoadEvent.loadBodyEvent = 2;
    /**
     * funcEvent事件的函数
     */
    LoadEvent.funcMap = {};
    /**
     * LoadEvent事件处理函数
     */
    LoadEvent.procArr = [];
    return LoadEvent;
}());
exports.LoadEvent = LoadEvent;
if (typeof window !== "undefined") {
    window.onpopstate = function (ev) {
        if (ev.state) {
            ev.state.isPopState = true;
            LoadEvent.procLoadEvent(ev.state);
        }
    };
    LoadEvent.procArr[LoadEvent.funcEvent] = function (d) {
        try {
            var func = LoadEvent.funcMap[d.dat];
            if (func)
                func();
        }
        catch (e) {
            dfvFront_1.dfvFront.onCatchError(e);
        }
    };
    LoadEvent.procArr[LoadEvent.loadBodyEvent] = function (d) {
        window.document.body.innerHTML = "";
        dfvFront_1.dfvFront.addEle(window.document.body, d.dat);
        if (!d.isPopState)
            dfvFront_1.dfvFront.scrollToTop();
    };
}
