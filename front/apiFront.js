"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiCRUD_1 = require("./common/db/apiCRUD");
const AjaxRequest_1 = require("./common/AjaxRequest");
const ComData_1 = require("./ComData");
const RichText_1 = require("./common/temp/RichText");
class apiFront {
    /**
    * 后台登陆
    *
    * @param req
    */
    static manage_login(req) {
        return apiFront.ajax("/manage/login").sendJSON(req, false);
    }
    /**
    * 删除文件
    *
    * @param req
    */
    static manage_del_file(req) {
        return apiFront.ajax("/manage/del_file").sendJSON(req, false);
    }
    static ajax(url, clas) {
        let aj = new AjaxRequest_1.AjaxRequest(url, clas);
        aj.paraObj = {
            uid: ComData_1.ComData.user.dat.uid + "",
            token_: ComData_1.ComData.user.dat.token,
        };
        return aj;
    }
}
exports.apiFront = apiFront;
apiCRUD_1.apiCRUD.ajax = apiFront.ajax;
RichText_1.RichText.uploadHook = editor => {
    editor.setUploadImgParas({
        uid: ComData_1.ComData.user.dat.uid + "",
        token_: ComData_1.ComData.user.dat.token,
    });
};
//# sourceMappingURL=apiFront.js.map