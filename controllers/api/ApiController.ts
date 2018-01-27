import {dfvContext, route} from "dfv";
import {TestReq1} from "../../models/TestReq1";

export class ApiController {
    ctx: dfvContext;


    @route.comment("接口名称", "接口简介", new TestReq1())
    @route.all()
    async test1(dat: TestReq1) {
        return dat;
    }

    @route.noAuth()
    @route.all()
    async test2() {
        return "ok";
    }

}
