"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
exports.viewLayout = {
    title: "title",
    startTime: Date.now(),
    body: (content, title, head) => {
        return (`<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    <title>${title ? title : exports.viewLayout.title}</title>
                    <link rel="stylesheet" href="/css/dfv.css" />
                    <script src="/js/promise.amd.min.js" ></script>${head ? head : ""}
                    <script>window.define=void 0</script>
                </head>
                <body>
                    ${content}
                </body>
            </html>`);
    },
    home: (content) => {
        return exports.viewLayout.body(content, exports.viewLayout.title, `<script src="/js/home.js?v=${exports.viewLayout.startTime}" ></script>`);
    },
    manage: (content) => {
        return exports.viewLayout.body(content, exports.viewLayout.title, `<script src="/js/manage.js?v=${exports.viewLayout.startTime}" ></script>`);
    },
    error: (msg) => {
        return exports.viewLayout.body(React.createElement("div", { class: "pad20" },
            React.createElement("h1", { class: "back_red pad10" }, msg),
            React.createElement("h2", { class: "back_yellow pad10" }, "\u7F51\u7EDC\u5F02\u5E38,\u8BF7\u91CD\u65B0\u64CD\u4F5C!")), exports.viewLayout.title + ' - 网络异常');
    },
};
//# sourceMappingURL=viewLayout.js.map