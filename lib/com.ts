import { dfv } from "dfv/src/public/dfv";
import { dfvContext } from "dfv/src/dfvContext";
import { dfvBindDom, dfvBind } from "dfv/src/public/dfvBind";
import * as  xss from 'xss';
import { IFieldRes } from "dfv/src/public/valid";

/**
 * 绑定一个表达式，非空验证，并将错误提示显示到旁边的<span>里
 * @param func
 * @returns {dfvBindDom}
 */
export function bindNotEmpty(func: (e: HTMLElement) => any) {
    return dfvBind(func, {
        onSet: com.notEmpty,
        onError: dfvBindDom.showErrorToNextSpan,
    });
}

/**
 * 前后端公用代码
 */
export class com {

    /**
    * 
    * @param r xss过滤
    */
    static xss(r: IFieldRes<any>) {
        r.val = xss(r.val);
        return true;
    }

    static xssStr(str: string) {
        return xss(str);
    }

    static xssObject(it: any) {
        for (var k in it) {
            var v = it[k];
            if (typeof v === "string") {
                it[k] = com.xssStr(v);
            }
        }
    }

    private static mobileStr = /(iphone|ipod|android|ios|phone|mobile)/i;

    static hasMobile(str?: string) {
        if (!str && typeof navigator !== "undefined") {
            return com.mobileStr.test(navigator.userAgent.toLowerCase())
        }
        if (!str)
            return false;
        return com.mobileStr.test(str.toLowerCase())
    }


    /**
     * 判断是否为移动端
     * @param req htto请求
     */
    static isMobile(req?: dfvContext) {
        return com.hasMobile(req ? req["request"].headers["user-agent"] as any : void 0)
    }

    static notEmpty(val: any) {
        // await dfv.sleep(1000)
        if (val == null || (typeof val === "number" && val == 0) || (typeof val === "string" && val == ""))
            throw dfv.err("不能为空");

        return val;
    }

    static hashPsw(psw: string, salt: string) {
        return md5(salt + md5(psw))
    }

    static bytesToSize(bytes: number) {
        if (bytes === 0) return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k))
        //return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        //toPrecision(3) 后面保留两位小数，如1.00GB  
    }
}


if (typeof window === "undefined") {
    for (var k in xss.whiteList) {
        var val = xss.whiteList[k];
        if (val instanceof Array) {
            val.push("style");
        }
    }

    //xss.whiteList.img!.push("style");
}
else {
    com.xss = (ee) => {
        return true;
    }
}