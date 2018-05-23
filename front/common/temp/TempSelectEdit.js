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
class TempSelectEdit {
    /**
     *
     * @param list 内容数组
     * @param validEdit  验证函数
     */
    constructor(list, validEdit) {
        this.list = list;
        this.validEdit = validEdit;
    }
    onShow(e) {
        let list = Array();
        if (this.list instanceof Array) {
            list = this.list.map((it, i) => React.createElement("option", { value: i, selected: i == e.value }, it));
        }
        else {
            for (let id in this.list) {
                list.push(React.createElement("option", { value: id, selected: id == e.value }, this.list[id]));
            }
        }
        e.dom =
            React.createElement("div", { class: "flex-row y-center pad3" },
                this.selec =
                    React.createElement("select", { class: "txt_blue", style: { width: "100%" } }, list),
                this.info = React.createElement("span", { class: "red" }));
    }
    onValid(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validEdit)
                    e.dat[e.field] = yield this.validEdit(this.selec.value, e.dat);
                else
                    e.dat[e.field] = this.selec.value;
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
exports.TempSelectEdit = TempSelectEdit;
//# sourceMappingURL=TempSelectEdit.js.map