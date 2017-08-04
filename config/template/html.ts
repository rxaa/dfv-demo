import * as fs from "fs";
import {ObjectID} from "mongodb";
import {array, dfv} from "dfv/src/public/dfv";
import * as path from "path";
import {FuncParse} from "dfv/src/FuncParse";
import {dfvController, dfvFile, dfvRouter, route} from "dfv";
import {IRouteComment} from "dfv/src/control/route";
import {valid} from "dfv/src/public/valid";
import {ajaxApi} from "./ajaxApi";


const SPACE_SIZE = "&nbsp;&nbsp;&nbsp;&nbsp;"

const typeStyle = (text) => `<span class="blue">:${text}</span>`
const commentStyle = (text) => `<span class="grey">${text}</span>`

export class ApiDoc {

    //生成文件路径
    static codeOutMenu = () => path.join(dfv.root, "runtime", "template");

    static indexFile = "index.html";
    static htmlMenu = () => path.join(ApiDoc.codeOutMenu(), "html")


    /**
     * index.html内容
     * @returns {string}
     */
    static genIndex() {
        let ret = `
<html>
    <meta charset="utf-8">
    <head>
        <title>接口说明</title>
        <link rel="stylesheet" href="dfv.css"/>
    </head>
    <body>
        <div class="pad10">
                `;

        let prevName = "";
        for (let control of ApiDoc.controlList) {

            //接口注释
            let apiComment = control.getComment();
            if (!apiComment)
                continue;

            if (control.clas.name != prevName) {
                ret += `<hr>`
            }
            prevName = control.clas.name;

            ret += `

<div class="back_white pad5 mar10b">
<a href="${FuncParse.fixUrl(control.url)}.html">
${apiComment.title}:
<span class="yellow">${control.url}</span>
</a>
</div>
`

            ApiDoc.genHtml(control, apiComment);
        }

        ret += `
        </div>
    </body>            
</html>`;
        return ret;
    }


    /**
     * 生成接口详细说明文件
     * @param control
     * @param apiComment
     */
    static genHtml(control: dfvController, apiComment: IRouteComment) {
        let noAuth = route.getNoAuth(control.clas, control.methodName);

        let ret = `
<html>
    <meta charset="utf-8">
    <head>
        <title>${apiComment.title}</title>
        <link rel="stylesheet" href="dfv.css"/>
    </head>
    <body  class="pad10">
        <div class="back_white pad10">
        <h2>${apiComment.title}</h2>
        <h3 class="yellow">${control.url}</h3>
        <p>请求类型:<b class="yellow">${control.info.method}</b></p>
        ${noAuth ? "" : "<b>需要登录验证</b>"}
        <p>${apiComment.content}</p>
        </div>
        <hr>
        <div class="back_white pad10">
        <h3>接口传入参数:</h3>
`;

        for (let i = 0; i < control.info.parasType.length; i++) {
            let type = control.info.parasType[i];
            let name = control.info.parasName[i];
            if (type === String) {
                ret += `<b>${name}</b>${typeStyle("(字串)")}<br>`
            }
            else if (type === Number) {
                ret += `<b>${name}</b>${typeStyle("(数字)")}<br>`
            }
            else {
                let req = new type();
                for (let key in req) {
                    let val = req[key];
                    if (val instanceof ObjectID) {
                        val = "";
                    }

                    ret += ApiDoc.recurObj(val, key, type, "");
                }
            }

        }


        ret += `
        </div>
        
        <hr>
        <div class="back_white pad10">
        <h3>接口返回数据:</h3>
        ${ApiDoc.recurObj(apiComment.retData, "", apiComment.retData.constructor, "")}
        </div>
        <hr/>
        <div class="back_white pad10">
        <h3>返回示例:</h3>
        <pre>${JSON.stringify(apiComment.retData)}</pre>
        </div>
    </body>
</html>`;


        let fileName = FuncParse.fixUrl(control.url) + ".html";
        fs.writeFileSync(path.join(ApiDoc.htmlMenu(), fileName), ret);
    }


    static readComment(classType: any, thisName: string) {
        return commentStyle(FuncParse.readComment(classType, thisName, 1));
    }

    /**
     * 解析嵌套对象
     * @param resp
     * @param name
     * @param classType
     * @param tabSize
     * @returns {string}
     */
    static recurObj(resp: any, name: string, classType: any, tabSize: string) {
        let ret = "";

        let thisName = "";
        if (name.length > 0)
            thisName += "this." + name;

        let type = typeof resp;


        if (type == "number" || resp instanceof Number || resp instanceof Date) {
            ret += tabSize + "<b>" + name + "</b>" + typeStyle("(数字)") + ApiDoc.readComment(classType, thisName) + "<br>";
        }
        else if (type == "string" || (type == "object" && resp == null) || resp instanceof String) {

            ret += tabSize + "<b>" + name + "</b>" + typeStyle("(字串)") + ApiDoc.readComment(classType, thisName) + "<br>";
        }
        else if (resp instanceof valid) {
            ret += tabSize + "<b>" + name + "</b>" + typeStyle("(文件)") + ApiDoc.readComment(classType, thisName) + "<br>";
        }
        else if (resp instanceof Array) {
            ret += tabSize + "<b>" + name + "</b>" + typeStyle("(数组)") + ApiDoc.readComment(classType, thisName) + "[" + "<br>";
            //数组有内容
            if ((resp as Array<any>).length > 0) {
                let arrObj = (resp as  Array<any>)[0] as any;
                let clasType = classType;
                if (arrObj && arrObj.constructor.name !== "Object") {
                    // ret += "arrObj.constructor:" + arrObj.constructor.name;
                    clasType = arrObj.constructor;
                }
                ret += ApiDoc.recurObj(arrObj, "", clasType, SPACE_SIZE + tabSize);
            }
            else { //数组无内容从dfv.arrayType取类型
                let arrType = dfv.getArrayType(resp);

                if (arrType) {
                    ret += ApiDoc.recurObj(new arrType(), "", arrType, SPACE_SIZE + tabSize);
                }
            }
            ret += tabSize + "]" + "<br>";
        }

        else if (type == "object") {

            // if (classType.name !== "Object") {
            ret += tabSize + "<b>" + name + "</b>" + typeStyle("(对象)") + ApiDoc.readComment(classType, thisName) + "{" + "<br>";
            // }

            for (let key in resp) {
                let clasType = classType;
                let val = resp[key];
                let type = typeof val;
                if (val && type != "string" && type != "number" && val.constructor.name !== "Object" && !(val instanceof Array)) {
                    // ret += "val.constructor.name:" + val.constructor.name;
                    clasType = val.constructor;
                }
                if (val instanceof ObjectID) {
                    val = "";
                }

                ret += ApiDoc.recurObj(val, key, clasType, SPACE_SIZE + tabSize);
            }

            if (classType != null) {
                ret += tabSize + "}" + "<br>";
            }

        }

        return ret;
    }

    static controlList = array(dfvController);

    static generate(cover?: boolean) {
        dfvRouter.onRouterLoad = ctx => {
            if (ctx) {
                ApiDoc.controlList.push(ctx);
            }
            else {
                ApiDoc.start(cover);
                ajaxApi.genFile();
            }
        }
    }

    private static async start(cover?: boolean) {
        //文档目录
        let menu = ApiDoc.htmlMenu();
        await dfvFile.mkdirs(menu);

        //目录文件
        let indexFileReal = path.join(menu, ApiDoc.indexFile);
        if (!cover && fs.existsSync(indexFileReal))
            return;

        console.log("generate api document to " + indexFileReal)
        await dfvFile.copyFile(path.join(dfv.root, "public", "css", "dfv.css"), path.join(menu, "dfv.css"))
        fs.writeFileSync(indexFileReal, ApiDoc.genIndex());
    }
}