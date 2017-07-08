import {dfv} from "dfv/src/public/dfv";
import {dfvContext} from "dfv/src/dfvContext";
import {dfvBindDom, dfvBind} from "dfv/src/public/dfvBind";


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
        if (val == null || (typeof val === "number" && val == 0 ) || (typeof val === "string" && val == "" ))
            throw dfv.err("不能为空");

        return val;
    }
}