import {
    SelectCountReq, SelectDelReq, SelectInsertReq, SelectReq,
    SelectUpdateReq,
    UploadRes
} from "../temp/SelectReq";
import { ListResp } from "..//temp/ListResp";
import { AjaxRequest } from "../AjaxRequest";
import { IUpdateRes } from "dfv/src/db/ISqlConnecter";

export interface NumRes {
    res: number;
}

export class apiCRUD {
    /**
     *查询列表
     * @param req
     */
    static selectList(req: SelectReq) {
        return apiCRUD.ajax<ListResp<any>>("/select/list").sendJSON(req);
    }

    /**
     *删除列表
     * @param req
     */
    static selectCount(req: SelectCountReq) {
        return apiCRUD.ajax<NumRes>("/select/count").sendJSON(req);
    }

    /**
     *删除列表
     * @param req
     */
    static selectDelList(req: SelectDelReq) {
        return apiCRUD.ajax<NumRes>("/select/del").sendJSON(req);
    }

    /**
     *更新列表
     * @param req
     */
    static selectUpdateList(req: SelectUpdateReq) {
        return apiCRUD.ajax<NumRes>("/select/update").sendJSON(req);
    }

    /**
     *插入列表
     * @param req
     */
    static selectInsert(req: SelectInsertReq) {
        return apiCRUD.ajax<NumRes>("/select/insert").sendJSON(req);
    }

    static upload(req: FormData) {
        return apiCRUD.ajax<UploadRes>("/file/upload").sendForm(req);
    }


    static ajax<T>(url: string, clas?: { new(): T }): AjaxRequest<T> {
        return new AjaxRequest<T>(url, clas);
    }
}