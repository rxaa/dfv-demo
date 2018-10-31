import * as fs from "fs";
import { ApiDoc } from "./html";
import { dfv, MapString } from "dfv/src/public/dfv";
import { FuncParse } from "dfv/src/FuncParse";
import * as path from "path";
import { mysqlModel } from "./mysqlModel";

export class ajaxApi {
    static outMenu = () => path.join(dfv.root, "front", "apiFront.ts");

    static imports: MapString<boolean> = {};
    static fileText = "";

    static genFile() {

        for (let control of ApiDoc.controlList) {
            //接口注释
            let apiComment = control.getComment();
            if (!apiComment)
                continue;

            //下划线式接口名
            let nameUrl = FuncParse.fixUrl(control.url)
            //驼峰式接口名
            let apiName = dfv.fixNameUpperCase(nameUrl);

            let paraType = "{}";
            if (control.info.parasType.length > 0) {
                paraType = "";
                for (let typeI = 0; typeI < control.info.parasType.length; typeI++) {
                    let typeStr = dfv.getFuncName(control.info.parasType[typeI]);
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

        let [codeStart, codeEnd] = mysqlModel.readFile(ajaxApi.outMenu());

        fs.writeFileSync(ajaxApi.outMenu(), codeStart + ajaxApi.fileText + codeEnd);
    }


    static getObjType(obj: any) {
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
            ret = ""
            let parent = dfv.getParent(obj.constructor);
            if (parent.length > 0) {
                parent.forEach(it => {
                    let name = dfv.getFuncName(it);
                    ajaxApi.imports[`import {${name}} from "../models/${name}";`] = true;
                    ret += name + "&"
                })
                ret = ret.removeLast();
                return ret;
            }
            let name = dfv.getFuncName(obj.constructor);
            ajaxApi.imports[`import {${name}} from "../models/${name}";`] = true;
            return name;
        }


        return ret;
    }
}