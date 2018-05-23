"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    onValid(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validEdit)
                    e.dat[e.field] = yield this.validEdit(this.text.value, e.dat);
                else
                    e.dat[e.field] = this.text.value;
                this.info.innerHTML = "";
            }
            catch (err) {
                this.info.innerHTML = err.message;
                return false;
            }
            return true;
        });
    }
}
exports.TempTextEdit = TempTextEdit;
//# sourceMappingURL=TempTextEdit.js.map