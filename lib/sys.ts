import { sql } from 'dfv/src/public/sql';

import { dfvContext, dfvLog, dfvLib } from "dfv";
import { dfv } from "dfv/src/public/dfv";

export class sys {

    /**
     * 每分钟请求数
     */
    static minUrlCount = 0;
    //当前值
    static currentUrlCount = 0;
    //最大值
    static maxUrlCount = 0;




    static frontLog(str: string, err?: Error) {
        dfvLog.write(str, err, dfvLog.getCutFile("front.log"));
    }

    /**
     * ip转换
     * @param ip
     * @returns {string}
     */
    static ipToRealIP(ip: string) {
        return ip.replace('::ffff:', '');
    }

    static getRealIp(ctx: dfvContext) {
        return sys.ipToRealIP(ctx.request.ip);
    }


    static hexString = "0123456789abcdefghijklmnopqrstuvwxyz";
    /**
     * 获取指定长度随机字串
     */
    static randStr(len: number) {
        let ret = "";
        for (let i = 0; i < len; i++) {
            ret += sys.hexString[dfv.randomInt(36)]
        }
        return ret;
    }

    static hashPsw(psw: string, salt: string) {
        return dfvLib.md5(salt + dfvLib.md5(psw))
    }

    static hashPsw2(psw: string, salt: string) {
        return dfvLib.md5(salt + psw)
    }
}