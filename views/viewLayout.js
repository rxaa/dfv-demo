"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
exports.viewLayout = {
    title: "title",
    startTime: Date.now(),
    body: (content, title) => {
        return ("<!DOCTYPE html>" +
            React.createElement("html", null,
                React.createElement("head", null,
                    React.createElement("meta", { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" }),
                    React.createElement("meta", { name: "viewport", content: "width=device-width,initial-scale=1.0" }),
                    React.createElement("title", null, title ? title : exports.viewLayout.title),
                    React.createElement("link", { rel: "stylesheet", href: "/css/dfv.css" }),
                    React.createElement("script", { src: "/js/promise.amd.min.js" }),
                    React.createElement("script", { src: "/js/all.js?v=" + exports.viewLayout.startTime }),
                    React.createElement("script", null, "window.define=void 0")),
                React.createElement("body", null, content)));
    },
    error: (msg) => {
        return exports.viewLayout.body(React.createElement("div", { class: "pad20" },
            React.createElement("h1", { class: "back_red pad10" }, msg),
            React.createElement("h2", { class: "back_yellow pad10" }, "\u7F51\u7EDC\u5F02\u5E38,\u8BF7\u91CD\u65B0\u64CD\u4F5C!")), exports.viewLayout.title + ' - 网络异常');
    },
};
//# sourceMappingURL=viewLayout.js.map