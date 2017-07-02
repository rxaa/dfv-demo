"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
const viewLayout_1 = require("../views/viewLayout");
class RouteController {
    static loginCheckApi(dat) {
        return dat.router.next(dat);
    }
    /**
     * 拦截Controller中的每一次URL请求
     * @param authFunc 登陆验证函数
     * @param errHtml 是否显示html错误页面
     */
    static onRoute(authFunc, errHtml) {
        return (dat) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!dat.valid.ok) {
                    //验证失败
                    dfv_1.dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid));
                    dat.ctx.status = 500;
                    dat.ctx.body = errHtml ? viewLayout_1.viewLayout.error(dat.valid.msg) : dat.valid.msg;
                    return;
                }
                let noAuto = dfv_1.route.getNoAuth(dat.router.clas, dat.router.methodName);
                let ret = (!noAuto && authFunc) ? yield authFunc(dat) : yield dat.router.next(dat);
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
        });
    }
}
exports.RouteController = RouteController;
//# sourceMappingURL=RouteController.js.map