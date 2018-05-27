"use strict";
/// <reference path="../common/frontTypes.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const LoginView_1 = require("./LoginView");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const dfv_1 = require("dfv/src/public/dfv");
const ComData_1 = require("../ComData");
const ListTemp_1 = require("../common/temp/ListTemp");
const LoadEvent_1 = require("../common/LoadEvent");
const TempSelectEdit_1 = require("../common/temp/TempSelectEdit");
const TempTextEdit_1 = require("../common/temp/TempTextEdit");
const TempRichTextEdit_1 = require("../common/temp/TempRichTextEdit");
const MenuView_1 = require("./MenuView");
const dfv_user_1 = require("../../models/dfv_user");
class mana {
    /**
     * 初始化
     */
    static init() {
        if (ComData_1.ComData.user.dat.id && ComData_1.ComData.user.dat.id != "") {
            //已登录
            LoadEvent_1.LoadEvent.pushFunc(() => {
                dfvFront_1.dfvFront.setBody(new MenuView_1.MenuView().render());
            });
        }
        else {
            dfvFront_1.dfvFront.setBody(new LoginView_1.LoginView().render());
        }
        ListTemp_1.ListTemp.addDelLog = str => {
        };
    }
    static unLogin() {
        ComData_1.ComData.user.dat = new dfv_user_1.dfv_user();
        ComData_1.ComData.user.save();
        window.location.reload();
    }
    /**
     * 获取小缩略图
     * @param fid 文件id
     * @returns {string}
     */
    static imgSmall() {
        return fid => {
            if (typeof fid === "string" && fid.indexOf("http") == 0)
                return `<img src=${fid} style="max-width:60px;height:auto;">`;
            if (fid < 1)
                return `<img src=""  width="60px">`;
            return `<img src="/file/get?fid=${fid}&thum=1" style="max-width:60px;height:auto;">`;
        };
    }
    /**
     * 除以100显示为元
     */
    static rmbDiv100() {
        return (r) => (r / 100);
    }
    /**
     * 除以100显示为元
     */
    static showDate() {
        return (r) => dfv_1.dfv.dateToY_M_D_H_M_S(r);
    }
    static showList(list) {
        return (r) => list[r];
    }
    static editList(list) {
        return new TempSelectEdit_1.TempSelectEdit(list);
    }
    /**
     * 原图
     * @param fid 文件id
     * @returns {string}
     */
    static imgOrig(fid) {
        if (fid < 1)
            return `<img src=""  width="100px">`;
        return `<img src="/api/file/get?fid=${fid}" width="100px">`;
    }
    static float(min, max) {
        return new TempTextEdit_1.TempTextEdit((r) => {
            let res = parseFloat(r);
            if (isNaN(res))
                throw Error("无效数字");
            if (min != null && res < min)
                throw Error("不能小于" + min);
            if (max != null && res > max)
                throw Error("不能大于" + max);
            return res;
        });
    }
    /**
     * 字串长度验证
     * @param min 最小长度
     * @param max 最大长度
     * @returns {function(any=): any}
     */
    static string(min, max) {
        return new TempTextEdit_1.TempTextEdit((r) => {
            if (min != null && r.length < min)
                throw Error("字数不能小于" + min);
            if (max != null && r.length > max)
                throw Error("字数不能大于" + max);
            return r;
        });
    }
    /**
     * 字串长度验证
     * @param min 最小长度
     * @param max 最大长度
     * @returns {function(any=): any}
     */
    static stringRich(min, max) {
        return new TempRichTextEdit_1.TempRichTextEdit((r) => {
            if (min != null && r.length < min)
                throw Error("字数不能小于" + min);
            if (max != null && r.length > max)
                throw Error("字数不能大于" + max);
            return r;
        });
    }
    static int(min, max) {
        return new TempTextEdit_1.TempTextEdit((r) => {
            let res = parseInt(r);
            if (isNaN(res))
                throw Error("无效数字");
            if (min != null && res < min)
                throw Error("不能小于" + min);
            if (max != null && res > max)
                throw Error("不能大于" + max);
            return res;
        });
    }
    /**
     * 浮点数乘以100
     * @param min
     * @param max
     * @returns {function(any=): number}
     */
    static floatMul100(min, max) {
        return new TempTextEdit_1.TempTextEdit((r) => {
            let res = parseFloat(r);
            if (isNaN(res))
                throw Error("无效数字");
            if (min != null && res < min)
                throw Error("不能小于" + min);
            if (max != null && res > max)
                throw Error("不能大于" + max);
            return Math.floor(res * 100);
        });
    }
    /**
     * 浮点数乘以1000
     * @param min
     * @param max
     * @returns {function(any=): number}
     */
    static floatMul1000(min, max) {
        return new TempTextEdit_1.TempTextEdit((r) => {
            let res = parseFloat(r);
            if (isNaN(res))
                throw Error("无效数字");
            if (min != null && res < min)
                throw Error("不能小于" + min);
            if (max != null && res > max)
                throw Error("不能大于" + max);
            return Math.floor(res * 1000);
        });
    }
}
exports.mana = mana;
//# sourceMappingURL=mana.js.map