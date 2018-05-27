"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const valid_1 = require("dfv/src/public/valid");
const dfvBind_1 = require("dfv/src/public/dfvBind");
const ManaReq_1 = require("../../models/ManaReq");
const com_1 = require("../../lib/com");
const apiFront_1 = require("../apiFront");
const ComData_1 = require("../ComData");
const mana_1 = require("./mana");
class LoginView {
    constructor() {
        this.dat = valid_1.valid.bindAble(ManaReq_1.LoginReq);
        this.render = () => React.createElement("div", { class: "h_m" },
            React.createElement("tt", { class: "m_p_t10 back_white pad20" },
                React.createElement("div", { class: "blue font_5 bold" }, "\u7CFB\u7EDF\u767B\u5F55"),
                React.createElement("div", { class: "mar15t" },
                    "\u8D26\u53F7:",
                    React.createElement("input", { class: "txt_blue", type: "text", title: '\u8D26\u53F7', value: com_1.bindNotEmpty(e => this.dat.id) }),
                    React.createElement("div", null),
                    React.createElement("span", { class: "red" })),
                React.createElement("div", { class: "mar10t" },
                    "\u5BC6\u7801:",
                    React.createElement("input", { class: "txt_blue", type: "password", title: '\u5BC6\u7801', value: com_1.bindNotEmpty(e => this.dat.psw) }),
                    React.createElement("div", null),
                    React.createElement("span", { class: "red" })),
                React.createElement("label", null,
                    React.createElement("input", { class: "mar10t", type: "checkbox", checked: dfvBind_1.dfvBind(e => this.dat.rember) }),
                    "\u8BB0\u4F4F\u5BC6\u7801"),
                React.createElement("div", { class: "mar10t" },
                    React.createElement("button", { class: "button_blue bold pad10 font_1", onclick: e => this.onLogin() }, "\u00A0\u767B\u5F55\u00A0"))));
    }
    async onLogin() {
        if (!(await valid_1.valid.checkAsync(this.dat)).ok) {
            return;
        }
        let res = await apiFront_1.apiFront.manage_login({
            id: this.dat.id,
            psw: ComData_1.ComData.md5(this.dat.psw),
            rember: this.dat.rember
        }).resp();
        ComData_1.ComData.user.dat = res;
        if (this.dat.rember)
            ComData_1.ComData.user.save();
        mana_1.mana.init();
    }
}
exports.LoginView = LoginView;
//# sourceMappingURL=LoginView.js.map