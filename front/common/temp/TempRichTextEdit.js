"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const RichText_1 = require("./RichText");
class TempRichTextEdit {
    /**
     *
     * @param validEdit  验证函数
     */
    constructor(validEdit) {
        this.validEdit = validEdit;
        this.editor = new RichText_1.RichText();
    }
    onShow(e) {
        this.editor.onBlur = () => {
            this.onValid(e);
        };
        this.editor.onInit = () => {
            this.fullScreenA = React.createElement("a", { onclick: e => this.toggleFullscreen(), href: "###" }, "\u5168\u5C4F");
            this.editor.addToolBarItem(this.fullScreenA);
            this.editor.setHtml(e.funcValue);
        };
        if (e.isEditAll) {
            e.dom =
                React.createElement("div", { class: "flex-row y-center" },
                    this.editor.render({
                        style: { width: "100%" },
                    }),
                    this.info = React.createElement("span", { class: "red" }));
        }
        else {
            e.dom =
                React.createElement("div", { class: "flex-col y-center" },
                    this.editor.render({
                        style: { width: "100%" },
                    }),
                    this.info = React.createElement("span", { class: "red" }));
            setTimeout(() => {
                //this.text.focus();
            }, 0);
        }
    }
    toggleFullscreen() {
        if (this.fullScreenA.innerHTML == "全屏") {
            this.fullScreenA.innerHTML = "退出全屏";
            this.editor.dom.className += " fullscreen-editor";
        }
        else {
            this.fullScreenA.innerHTML = "全屏";
            dfvFront_1.dfvFront.classRemove(this.editor.dom, "fullscreen-editor");
        }
    }
    async onValid(e) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.editor.getHtml(), e.dat);
            else
                e.dat[e.field] = this.editor.getHtml();
            ;
            this.info.innerHTML = "";
        }
        catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }
        return true;
    }
}
exports.TempRichTextEdit = TempRichTextEdit;
//# sourceMappingURL=TempRichTextEdit.js.map