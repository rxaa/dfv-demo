import * as fs from "fs";
import {ApiDoc} from "./html";
import {dfv, MapString} from "dfv/src/public/dfv";
import {FuncParse} from "dfv/src/FuncParse";

export class ajaxApi {

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
                paraType = dfv.getFuncName(control.info.parasType[0]);
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
        return apiCRUD.ajax<${ajaxApi.getObjType(resp)}>("${control.url}").sendJSON(req, ${notPost});
    }
    
`;
        }

        //收尾
        let apiFile = ApiDoc.codeOutMenu() + "/api.ts";

        let imports = "";
        for (let k in ajaxApi.imports) {
            imports += k + "\r\n";
        }
        imports += `
            
export class api {

${ajaxApi.fileText}

}
`;
        fs.writeFileSync(apiFile, imports);
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