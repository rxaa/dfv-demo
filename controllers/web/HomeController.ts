import {dfvContext, route} from "dfv";
import {valid} from "dfv/src/public/valid";
import {array, arrayString, dfv} from "dfv/src/public/dfv";
import {MongoConnect} from "dfv/src/db/MongoConnect";


@route.path("")
export class HomeController {

    /**
     * 不论是kos还是Express的req,resp都被转换为了统一的ctx属性
     */
    ctx: dfvContext;


    /**
     * url为 /
     */
    @route.get('/')
    async index() {
        MongoConnect
        //返回值作为response body
        return "index:" + this.ctx.request.ip;
    }


}