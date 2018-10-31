/// <reference path="../common/frontTypes.d.ts" />

import { LoginView } from "./LoginView";
import { dfvFront } from "dfv/src/public/dfvFront";
import { dfv, MapString, MapNumber } from "dfv/src/public/dfv";
import { ComData } from "../ComData";
import { ListTemp } from "../common/temp/ListTemp";
import { LoadEvent } from "../common/LoadEvent";
import { TempSelectEdit } from "../common/temp/TempSelectEdit";
import { TempTextEdit } from "../common/temp/TempTextEdit";
import { TempRichTextEdit } from "../common/temp/TempRichTextEdit";
import { MenuView } from "./MenuView";
import { dfv_user } from "../../models/dfv_user";

export class mana {

    /**
     * 初始化
     */
    static init() {

        if (ComData.user.dat.id && ComData.user.dat.id != "") {
            //已登录
            LoadEvent.pushFunc(() => {
                dfvFront.setBody(new MenuView().render())
            })

        }
        else {
            dfvFront.setBody(new LoginView().render())
        }

        ListTemp.addDelLog = str => {

        }

    }

    static unLogin() {
        ComData.user.dat = new dfv_user();
        ComData.user.save();
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
                return `<img src=${fid} style="max-width:60px;height:auto;">`
            if (fid < 1)
                return `<img src=""  width="60px">`;
            return `<img src="/file/get?fid=${fid}&thum=1" style="max-width:60px;height:auto;">`
        }

    }



    /**
     * 除以100显示为元
     */
    static rmbDiv100() {
        return (r: number) => (r / 100)
    }

    /**
     * 除以100显示为元
     */
    static showDate() {
        return (r: number) => dfv.dateToY_M_D_H_M_S(r);
    }


    static showList(list: Array<any> | MapString<any> | MapNumber<any>) {
        return (r: number) => list[r];
    }
    static editList(list: Array<any> | MapString<any> | MapNumber<any>) {
        return new TempSelectEdit(list);
    }

    /**
     * 原图
     * @param fid 文件id
     * @returns {string}
     */
    static imgOrig(fid: number) {
        if (fid < 1)
            return `<img src=""  width="100px">`
        return `<img src="/api/file/get?fid=${fid}" width="100px">`
    }

    static float(min?: number, max?: number, notShowValue?: boolean) {
        return new TempTextEdit({
            notShowValue: notShowValue,
            validEdit: (r: string) => {
                let res = parseFloat(r);
                if (isNaN(res))
                    throw Error("无效数字");
                if (min != null && res < min)
                    throw Error("不能小于" + min);
                if (max != null && res > max)
                    throw Error("不能大于" + max);
                return res;
            }
        });
    }

    /**
     * 字串长度验证
     * @param min 最小长度
     * @param max 最大长度
     * @returns {function(any=): any}
     */
    static string(min?: number, max?: number) {
        return new TempTextEdit({
            validEdit: (r: string) => {
                if (min != null && r.length < min)
                    throw Error("字数不能小于" + min);
                if (max != null && r.length > max)
                    throw Error("字数不能大于" + max);
                return r;
            }
        });
    }

    /**
     * 字串长度验证
     * @param min 最小长度
     * @param max 最大长度
     * @returns {function(any=): any}
     */
    static stringRich(min?: number, max?: number) {
        return new TempRichTextEdit((r: string) => {
            if (min != null && r.length < min)
                throw Error("字数不能小于" + min);
            if (max != null && r.length > max)
                throw Error("字数不能大于" + max);
            return r;
        });
    }


    static int(min?: number, max?: number) {
        return new TempTextEdit({
            validEdit: (r: string) => {
                let res = parseInt(r);
                if (isNaN(res))
                    throw Error("无效数字");
                if (min != null && res < min)
                    throw Error("不能小于" + min);
                if (max != null && res > max)
                    throw Error("不能大于" + max);
                return res;
            }
        });
    }

    /**
     * 浮点数乘以100
     * @param min
     * @param max
     * @returns {function(any=): number}
     */
    static floatMul100(min?: number, max?: number) {
        return new TempTextEdit({
            validEdit: (r: string) => {
                let res = parseFloat(r);
                if (isNaN(res))
                    throw Error("无效数字");
                if (min != null && res < min)
                    throw Error("不能小于" + min);
                if (max != null && res > max)
                    throw Error("不能大于" + max);
                return Math.floor(res * 100);
            }
        });
    }


    /**
     * 浮点数乘以1000
     * @param min
     * @param max
     * @returns {function(any=): number}
     */
    static floatMul1000(min?: number, max?: number) {
        return new TempTextEdit({
            validEdit: (r: string) => {
                let res = parseFloat(r);
                if (isNaN(res))
                    throw Error("无效数字");
                if (min != null && res < min)
                    throw Error("不能小于" + min);
                if (max != null && res > max)
                    throw Error("不能大于" + max);
                return Math.floor(res * 1000);
            }
        });
    }
}
