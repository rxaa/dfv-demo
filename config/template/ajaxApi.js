"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const html_1 = require("./html");
const dfv_1 = require("dfv/src/public/dfv");
const FuncParse_1 = require("dfv/src/FuncParse");
const path = require("path");
const mysqlModel_1 = require("./mysqlModel");
class ajaxApi {
    static genFile() {
        for (let control of html_1.ApiDoc.controlList) {
            //接口注释
            let apiComment = control.getComment();
            if (!apiComment)
                continue;
            //下划线式接口名
            let nameUrl = FuncParse_1.FuncParse.fixUrl(control.url);
            //驼峰式接口名
            let apiName = dfv_1.dfv.fixNameUpperCase(nameUrl);
            let paraType = "{}";
            if (control.info.parasType.length > 0) {
                paraType = "";
                for (let typeI = 0; typeI < control.info.parasType.length; typeI++) {
                    let typeStr = dfv_1.dfv.getFuncName(control.info.parasType[typeI]);
                    if (typeStr === "Number" || typeStr === "String") {
                        typeStr = `{ ${control.info.parasName[typeI]}: ${typeStr.toLowerCase()} }`;
                    }
                    if (paraType.length > 0)
                        paraType += " & ";
                    paraType += typeStr;
                }
            }
            let resp = apiComment.retData;
            let notPost = "false";
            if (control.info.method.toLowerCase() == "get") {
                notPost = "true";
            }
            ajaxApi.fileText += `
    /**
     * ${apiComment.title}
     * ${apiComment.content}
     * @param req
     */
    static ${apiName}(req: ${paraType}) {
        return apiFront.ajax<${ajaxApi.getObjType(resp)}>("${control.url}").sendJSON(req, ${notPost});
    }
    
`;
        }
        let [codeStart, codeEnd] = mysqlModel_1.mysqlModel.readFile(ajaxApi.outMenu());
        fs.writeFileSync(ajaxApi.outMenu(), codeStart + ajaxApi.fileText + codeEnd);
    }
    static getObjType(obj) {
        let ret = "any";
        if (obj == null)
            return ret;
        if (typeof obj == "string" || obj instanceof String) {
            return "string";
        }
        if (obj instanceof Array) {
            return ajaxApi.getObjType(obj[0]);
        }
        if (typeof obj == "object") {
            ret = "";
            let parent = dfv_1.dfv.getParent(obj.constructor);
            if (parent.length > 0) {
                parent.forEach(it => {
                    let name = dfv_1.dfv.getFuncName(it);
                    ajaxApi.imports[`import {${name}} from "../models/${name}";`] = true;
                    ret += name + "&";
                });
                ret = ret.removeLast();
                return ret;
            }
            let name = dfv_1.dfv.getFuncName(obj.constructor);
            ajaxApi.imports[`import {${name}} from "../models/${name}";`] = true;
            return name;
        }
        return ret;
    }
}
ajaxApi.outMenu = () => path.join(dfv_1.dfv.root, "front", "apiFront.ts");
ajaxApi.imports = {};
ajaxApi.fileText = "";
exports.ajaxApi = ajaxApi;
//# sourceMappingURL=ajaxApi.js.map