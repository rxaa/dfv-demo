"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
const dfv_2 = require("dfv/src/public/dfv");
class sys {
    static frontLog(str, err) {
        dfv_1.dfvLog.write(str, err, dfv_1.dfvLog.getCutFile("front.log"));
    }
    /**
     * ip转换
     * @param ip
     * @returns {string}
     */
    static ipToRealIP(ip) {
        return ip.replace('::ffff:', '');
    }
    static getRealIp(ctx) {
        return sys.ipToRealIP(ctx.request.ip);
    }
    /**
     * 获取指定长度随机字串
     */
    static randStr(len) {
        let ret = "";
        for (let i = 0; i < len; i++) {
            ret += sys.hexString[dfv_2.dfv.randomInt(36)];
        }
        return ret;
    }
    static hashPsw(psw, salt) {
        return dfv_1.dfvLib.md5(salt + dfv_1.dfvLib.md5(psw));
    }
    static hashPsw2(psw, salt) {
        return dfv_1.dfvLib.md5(salt + psw);
    }
}
/**
 * 每分钟请求数
 */
sys.minUrlCount = 0;
//当前值
sys.currentUrlCount = 0;
//最大值
sys.maxUrlCount = 0;
sys.hexString = "0123456789abcdefghijklmnopqrstuvwxyz";
exports.sys = sys;
//# sourceMappingURL=sys.js.map