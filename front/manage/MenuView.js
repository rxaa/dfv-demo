"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const mana_1 = require("./mana");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const dfvWindow_1 = require("dfv/src/public/dfvWindow");
const LoadEvent_1 = require("../common/LoadEvent");
const TreeMenu_1 = require("../common/component/TreeMenu");
const UserManageView_1 = require("./UserManageView");
const com_1 = require("../../lib/com");
const ComData_1 = require("../ComData");
const dfv_user_1 = require("../../models/dfv_user");
const FileManageView_1 = require("./FileManageView");
class MenuView {
    constructor() {
        this.menu = {
            '主页': [
                [`欢迎页面`, e => this.setContent(this.welcome())],
            ],
            "系统": [
                [`用户管理`, e => this.setContent(UserManageView_1.UserManageView.list())],
                [`文件管理`, e => this.setContent(FileManageView_1.FileManageView.list())],
            ],
        };
        this.treeMenu = new TreeMenu_1.TreeMenu();
        this.header = () => React.createElement("div", { class: "pad10" },
            React.createElement("a", { class: "pad10 hover_yelow white", href: "/" }, "\u9996\u9875"),
            React.createElement("span", { class: "pad10 hover_yelow", onclick: e => this.logout() }, "\u9000\u51FA\u767B\u9646"));
        this.render = () => com_1.com.hasMobile() ?
            this.renderMobile()
            :
                React.createElement("div", { class: "flex flex-row height_p100" },
                    React.createElement("div", { class: "height_p100 auto_over" }, this.treeMenu.render(this.menu)),
                    React.createElement("div", { class: "flex flex-col" },
                        React.createElement("div", { class: "ba_blue2 white flex-row x-end" }, this.header()),
                        this.content = React.createElement("div", { class: "flex flex-col auto_over" }, this.welcome())));
        this.renderMobile = () => {
            let v = React.createElement("div", { class: "width_p100 height_p100" },
                React.createElement("div", { class: "fixed width_p100 top0" },
                    React.createElement("div", { class: "ba_blue2 white flex-row" },
                        React.createElement("span", { class: "flex pad10 hover_yelow inline", onclick: e => this.onMenuFold() }, "\u83DC\u5355"),
                        this.header()),
                    this.leftMenu = React.createElement("div", { class: "fixed z999" }, this.treeMenu.render(this.menu))),
                this.content = React.createElement("div", { class: "pad35t height_p100 flex-col" }, this.welcome()));
            setTimeout(() => {
                this.leftMenu.style.left = "-" + this.leftMenu.offsetHeight + "px";
                this.leftMenu.className += " anim_left";
            }, 0);
            return v;
        };
        this.init();
    }
    welcome() {
        return React.createElement("div", { class: "pad10 back_yellow mar10" },
            React.createElement("p", null,
                "[",
                React.createElement("span", { class: "blue" }, ComData_1.ComData.user.dat.id),
                "],\u6B22\u8FCE\u767B\u5F55\uFF01"),
            React.createElement("p", null,
                "\u6743\u9650:",
                React.createElement("span", { class: "blue" }, dfv_user_1.dfv_user.autoStr[ComData_1.ComData.user.dat.auth])),
            React.createElement("p", null,
                "\u767B\u5F55ip:",
                React.createElement("span", { class: "blue" }, ComData_1.ComData.user.dat.ip)));
    }
    async init() {
        this.treeMenu.onItemClick = e => {
            this.unFold();
        };
    }
    onMenuFold() {
        if (this.leftMenu.style.left == "0px") {
            this.unFold();
        }
        else {
            this.leftMenu.style.left = "0px";
        }
    }
    unFold() {
        if (this.leftMenu)
            this.leftMenu.style.left = "-" + this.leftMenu.offsetHeight + "px";
    }
    /**
     * 设置content视图
     * @param e
     */
    setContent(e) {
        if (!e)
            return;
        LoadEvent_1.LoadEvent.pushFunc(() => {
            dfvFront_1.dfvFront.setEle(this.content, e);
        });
    }
    logout() {
        let d = new dfvWindow_1.dfvWindow();
        d.addCover();
        d.showWithOk("退出登陆", "确定要退出登陆？", e => {
            d.close();
            mana_1.mana.unLogin();
        });
    }
}
exports.MenuView = MenuView;
//# sourceMappingURL=MenuView.js.map