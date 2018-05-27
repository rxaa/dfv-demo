import { dfv_user } from "../models/dfv_user";
import { ObjStorage } from "./common/ObjStorage";

export class ComData {
    /**
    * 储存登陆后的用户信息
    * @type {any}
    */
    static user = new ObjStorage(dfv_user)


    static md5(str: string) {
        return md5(str);
    }
}