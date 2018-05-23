"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const RichText_1 = require("../common/temp/RichText");
class HomeIndex {
    constructor() {
        this.editor = new RichText_1.RichText();
        this.editor.onInit = () => {
            this.editor.addToolBarItem(React.createElement("a", { href: "###" }, "\u5168\u5C4F"));
            this.editor.setHtml("初始化测试");
        };
    }
    render() {
        return React.createElement("div", null,
            "\u5BCC\u6587\u672C\u6D4B\u8BD5\uFF1A",
            this.editor.render({
                style: {
                    width: "100%"
                }
            }));
    }
}
exports.HomeIndex = HomeIndex;
//# sourceMappingURL=HomeIndex.js.map