import {dfvContext, route} from "dfv";


@route.path("")
export class HomeController {
    /**
     * 不论是koa还是Express的req,resp都被转换为了统一的ctx属性
     */
    ctx: dfvContext;


    /**
     * url为 /
     */
    @route.get('/')
    async index() {
        //返回值作为response body
        return "index:" + this.ctx.request.ip;
    }


}