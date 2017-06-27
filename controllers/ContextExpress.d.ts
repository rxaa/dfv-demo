import * as express from "express";
import {dfvContext} from "dfv";


/**
 * 设置dfvContext的request与response属性类型
 */
declare module "dfv/src/dfvContext" {
    interface dfvContext {
        request: express.Request;
        response: express.Response;
    }
}
