import { IOnRouteParas } from "dfv/src/control/dfvController";
import { dfvLog, route } from "dfv";
import { viewLayout } from "../views/viewLayout";
import { ShowAbleErr } from "dfv/src/public/dfv";
import { dfvContext } from "dfv/src/dfvContext";
import { RouteUser } from "./RouteUser";


const __userInfo__ = "__userInfo__";

export class RouteController {

    /**
    * 获取ctx中的用户信息
    * @param ctx 
    */
    static getUserInfo(ctx: dfvContext) {
        return ctx.request[__userInfo__] as RouteUser | undefined
    }

    static loginCheckApi(dat: IOnRouteParas) {

        //填充用户信息
        dat.ctx.request[__userInfo__] = {
            id: 0,
            //权限转换
            auth: 0,
            name: "",
        } as RouteUser;

        return dat.router.next(dat);
    }

    /**
     * 拦截Controller中的每一次URL请求
     * @param authFunc 登陆验证函数
     * @param errHtml 是否显示html错误页面
     */
    static onRoute(authFunc?: (dat: IOnRouteParas) => Promise<void>, errHtml?: boolean) {
        return async (dat: IOnRouteParas) => {
            try {
                if (!dat.valid.ok) {
                    //验证失败
                    dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid));
                    dat.ctx.status = 500;
                    dat.ctx.body = errHtml ? viewLayout.error(dat.valid.msg) : dat.valid.msg;
                    return;
                }

                /**
                 * 查找成员函数有无noAuth装饰器
                 */
                let noAuth = route.getNoAuth(dat.router.clas, dat.router.methodName);
                let ret = (!noAuth && authFunc) ? await authFunc(dat) : await dat.router.next(dat);
                if (ret != null)
                    dat.ctx.body = ret;

            } catch (e) {
                dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid), e)

                dat.ctx.status = 500;

                if ((e as ShowAbleErr).showMsg)
                    dat.ctx.body = e.message;
                else
                    dat.ctx.body = "server error!";

                if (errHtml)
                    dat.ctx.body = viewLayout.error(dat.ctx.body)
            }

        }
    }

}