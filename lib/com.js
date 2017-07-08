"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv/src/public/dfv");
const dfvBind_1 = require("dfv/src/public/dfvBind");
/**
 * 绑定一个表达式，非空验证，并将错误提示显示到旁边的<span>里
 * @param func
 * @returns {dfvBindDom}
 */
function bindNotEmpty(func) {
    return dfvBind_1.dfvBind(func, {
        onSet: com.notEmpty,
        onError: dfvBind_1.dfvBindDom.showErrorToNextSpan,
    });
}
exports.bindNotEmpty = bindNotEmpty;
/**
 * 前后端公用代码
 */
class com {
    static hasMobile(str) {
        if (!str && typeof navigator !== "undefined") {
            return com.mobileStr.test(navigator.userAgent.toLowerCase());
        }
        if (!str)
            return false;
        return com.mobileStr.test(str.toLowerCase());
    }
    /**
     * 判断是否为移动端
     * @param req htto请求
     */
    static isMobile(req) {
        return com.hasMobile(req ? req["request"].headers["user-agent"] : void 0);
    }
    static notEmpty(val) {
        // await dfv.sleep(1000)
        if (val == null || (typeof val === "number" && val == 0) || (typeof val === "string" && val == ""))
            throw dfv_1.dfv.err("不能为空");
        return val;
    }
}
com.mobileStr = /(iphone|ipod|android|ios|phone|mobile)/i;
exports.com = com;
//# sourceMappingURL=com.js.map