"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontCfg_1 = require("./../../../config/frontCfg");
const AjaxRequest_1 = require("../AjaxRequest");
class apiCRUD {
    /**
     *查询列表
     * @param req
     */
    static selectList(req) {
        return apiCRUD.ajax("/select/list").sendJSON(req);
    }
    /**
     *删除列表
     * @param req
     */
    static selectCount(req) {
        return apiCRUD.ajax("/select/count").sendJSON(req);
    }
    /**
     *删除列表
     * @param req
     */
    static selectDelList(req) {
        return apiCRUD.ajax("/select/del").sendJSON(req);
    }
    /**
     *更新列表
     * @param req
     */
    static selectUpdateList(req) {
        return apiCRUD.ajax("/select/update").sendJSON(req);
    }
    /**
     *插入列表
     * @param req
     */
    static selectInsert(req) {
        return apiCRUD.ajax("/select/insert").sendJSON(req);
    }
    static upload(req) {
        return apiCRUD.ajax(frontCfg_1.frontCfg.apiUploadFile).sendForm(req);
    }
    static ajax(url, clas) {
        return new AjaxRequest_1.AjaxRequest(url, clas);
    }
}
exports.apiCRUD = apiCRUD;
//# sourceMappingURL=apiCRUD.js.map