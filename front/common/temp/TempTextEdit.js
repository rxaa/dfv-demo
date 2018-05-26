"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
class TempTextEdit {
    /**
     *
     * @param validEdit  验证函数
     */
    constructor(validEdit) {
        this.validEdit = validEdit;
    }
    onShow(e) {
        if (e.isEditAll) {
            e.dom =
                React.createElement("div", { class: "flex-row y-center" },
                    this.text =
                        React.createElement("textarea", { class: "txt_blue", style: { width: "100%" }, onblur: ev => this.onValid(e) }, e.funcValue),
                    this.info = React.createElement("span", { class: "red" }));
        }
        else {
            e.dom =
                React.createElement("div", { class: "flex-col y-center" },
                    this.text =
                        React.createElement("textarea", { class: "txt_blue", style: { width: "180px", height: "80px" } }, e.funcValue),
                    this.info = React.createElement("span", { class: "red" }));
            setTimeout(() => {
                this.text.focus();
            }, 0);
        }
    }
    async onValid(e) {
        try {
            if (this.validEdit)
                e.dat[e.field] = await this.validEdit(this.text.value, e.dat);
            else
                e.dat[e.field] = this.text.value;
            this.info.innerHTML = "";
        }
        catch (err) {
            this.info.innerHTML = err.message;
            return false;
        }
        return true;
    }
}
exports.TempTextEdit = TempTextEdit;
//# sourceMappingURL=TempTextEdit.js.map