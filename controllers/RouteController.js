"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
const viewLayout_1 = require("../views/viewLayout");
const dfv_2 = require("dfv/src/public/dfv");
const db_1 = require("../models/db");
const __userInfo__ = "__userInfo__";
class RouteController {
    /**
    * 获取ctx中的用户信息
    * @param ctx
    */
    static getUserInfo(ctx) {
        return ctx.request[__userInfo__];
    }
    /**
     *  登陆验证
     * @param dat
     */
    static async loginCheckApi(dat) {
        //分别尝试从url,body或multipart中获取请求参数
        let para = dat.ctx.request.method.toLowerCase() == "get" ?
            dat.ctx.request.query : dat.ctx.request.body;
        if (dat.ctx.multipart)
            para = dat.ctx.multipart.fields;
        //获取用户信息并缓存
        let user = (await db_1.db.dfv_user().cacheGetInt(parseInt(para.uid)))[0];
        if (!user) {
            throw dfv_2.dfv.err("未登录1");
        }
        if (user.token != para.token_) {
            throw dfv_2.dfv.err("登录失效，请<a href='javascript:mana.unLogin();'>重新登录</a>！");
        }
        //填充用户信息
        dat.ctx.request[__userInfo__] = {
            uid: user.uid,
            auth: user.auth,
            name: user.id,
        };
        return dat.router.next(dat);
    }
    /**
     * 拦截Controller中的每一次URL请求
     * @param authFunc 登陆验证函数
     * @param errHtml 是否显示html错误页面
     */
    static onRoute(authFunc, errHtml) {
        return async (dat) => {
            try {
                if (!dat.valid.ok) {
                    //验证失败
                    dfv_1.dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid));
                    dat.ctx.status = 500;
                    dat.ctx.body = errHtml ? viewLayout_1.viewLayout.error(dat.valid.msg) : dat.valid.msg;
                    return;
                }
                /**
                 * 查找成员函数有无noAuth装饰器
                 */
                let noAuth = dfv_1.route.getNoAuth(dat.router.clas, dat.router.methodName);
                let ret = (!noAuth && authFunc) ? await authFunc(dat) : await dat.router.next(dat);
                if (ret != null)
                    dat.ctx.body = ret;
            }
            catch (e) {
                dfv_1.dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid), e);
                dat.ctx.status = 500;
                if (e.showMsg)
                    dat.ctx.body = e.message;
                else
                    dat.ctx.body = "server error!";
                if (errHtml)
                    dat.ctx.body = viewLayout_1.viewLayout.error(dat.ctx.body);
            }
        };
    }
}
exports.RouteController = RouteController;
//# sourceMappingURL=RouteController.js.map