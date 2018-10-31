import { dfv_user } from './../models/dfv_user';
import { LoginReq, DelFileReq } from "../models/ManaReq";
import { LoginCheckPara } from "../models/LoginCheckPara";
import { apiCRUD } from "./common/db/apiCRUD";
import { AjaxRequest } from "./common/AjaxRequest";
import { ComData } from './ComData';
import { RichText } from './common/temp/RichText';

export class apiFront {
    ////////////以下代码为自动生成,请勿修改//////////////
    /////////////auto generate start//////////////////

    /**
     * 后台登陆
     * 
     * @param req
     */
    static manage_login(req: LoginReq) {
        return apiFront.ajax<dfv_user>("/manage/login").sendJSON(req, false);
    }
    

    /**
     * 删除文件
     * 
     * @param req
     */
    static manage_del_file(req: DelFileReq) {
        return apiFront.ajax<Object>("/manage/del_file").sendJSON(req, false);
    }
    

    /////////////auto generate end///////////////////

    static ajax<T>(url: string, clas?: { new(): T }): AjaxRequest<T> {
        let aj = new AjaxRequest<T>(url, clas);
        aj.paraObj = {
            uid: ComData.user.dat.uid + "",
            token_: ComData.user.dat.token,
        } as LoginCheckPara
        return aj;
    }
}

apiCRUD.ajax = apiFront.ajax

RichText.uploadHook = editor => {
    editor.setUploadImgParas({
        uid: ComData.user.dat.uid + "",
        token_: ComData.user.dat.token,
    } as LoginCheckPara);
}
