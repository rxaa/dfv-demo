import {dfvContext, route} from "dfv";


@route.path("")
export class HomeController {
    ctx: dfvContext;


    /**
     */
    @route.get('/')
    async index(id: number) {
        //返回值作为response body
        return "index:" + id;
    }



}