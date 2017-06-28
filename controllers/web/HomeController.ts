import {dfvContext, route} from "dfv";
import {viewHome} from "../../views/viewHome";


@route.path("")
export class HomeController {
    ctx: dfvContext;

    @route.get("/")
    async index() {

        return viewHome.index();
    }


}