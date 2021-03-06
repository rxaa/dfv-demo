"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
class TempTextEdit {
    /**
     *
     * @param validEdit 验证函数
     * @param password 是否作为密码输入框
     */
    constructor(para = {}) {
        this.para = para;
    }
    onShow(e) {
        if (e.isEditAll) {
            e.dom =
                React.createElement("div", { class: "flex-row y-center" },
                    this.text =
                        this.para.password ?
                            React.createElement("input", { type: "password", class: "txt_blue", style: { width: "100%" }, onblur: ev => this.onValid(e) })
                            :
                                React.createElement("textarea", { class: "txt_blue", style: { width: "100%" }, onblur: ev => this.onValid(e) }, this.para.notShowValue ? "" : e.funcValue),
                    this.info = React.createElement("span", { class: "red" }));
        }
        else {
            e.dom =
                React.createElement("div", { class: "flex-col y-center" },
                    this.text =
                        this.para.password ?
                            React.createElement("input", { type: "password", class: "txt_blue", style: { width: "180px", height: "80px" }, onblur: ev => this.onValid(e) })
                            :
                                React.createElement("textarea", { class: "txt_blue", style: { width: "180px", height: "80px" } }, this.para.notShowValue ? "" : e.funcValue),
                    this.info = React.createElement("span", { class: "red" }));
            setTimeout(() => {
                this.text.focus();
            }, 0);
        }
    }
    async onValid(e) {
        try {
            if (this.para.validEdit)
                e.dat[e.field] = await this.para.validEdit(this.text.value, e);
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