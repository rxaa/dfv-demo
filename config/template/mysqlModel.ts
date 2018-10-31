import * as fs from "fs";
import * as path from "path";
import { dfv } from "dfv/src/public/dfv";
import { db } from "../../models/db";
import { dfvFile } from "dfv";

export class mysqlModel {

    static outMenu = () => path.join(dfv.root, "models");

    static dbClassName = () => path.join(mysqlModel.outMenu(), "db.ts");
    static dbFrontClassName = () => path.join(mysqlModel.outMenu(), "dbFront.ts");

    static codeStart = "//auto generate start//";
    static codeEnd = "//auto generate end//";

    static cacheTableMap = {
        // ts_goods_pic: "gid",
    }


    /**
     * 创建db class
     * @param tables
     */
    static dbClass(tables: string[]) {
        let [codeStart, codeEnd] = mysqlModel.readFile(mysqlModel.dbClassName());


        for (let s of tables) {
            codeStart += `

    /**
     *
     */
    ${s}: () => new SqlBuilder(${s}, db.connecter),`
        }


        fs.writeFileSync(mysqlModel.dbClassName(), codeStart + codeEnd);

        [codeStart, codeEnd] = mysqlModel.readFile(mysqlModel.dbFrontClassName());
        for (let s of tables) {
            codeStart += `

    /**
     *
     */
    ${s}: () => new DbSession(${s}),`
        }


        fs.writeFileSync(mysqlModel.dbFrontClassName(), codeStart + codeEnd);
    }

    /**
     * 创建表model
     * @param table
     * @param info
     */
    static tableClass(table: string, info: FieldInfo[]) {

        //如果文件以存在,则不创建
        let fileName = path.join(mysqlModel.outMenu(), table + ".ts");
        if (fs.existsSync(fileName))
            return;

        let code = `
import {sql} from "dfv/src/public/sql";

export class ${table} {
`

        for (let field of info) {

            /**
             * 字段的类型,缺省值
             */
            let type = "string";
            let def = `""`;

            if (field.Type.indexOf("int") >= 0 || field.Type.indexOf("double") >= 0 || field.Type.indexOf("float") >= 0) {
                type = "number";
                if (field.Default != null)
                    def = field.Default + "";
                else
                    def = "0";
            }
            else if (field.Type.indexOf("date") >= 0) {
                type = "Date";
                def = "new Date()";
            }
            else {
                type = "string";
                if (field.Default != null)
                    def = `"${field.Default}"`;
            }

            code += `

    /**
     * ${field.Comment}
     */`
            if (field.Key == "PRI") {
                code += `
    @sql.primaryKey`
                // def = "null"
            }


            if (field.Extra == "auto_increment") {
                code += `
    @sql.autoIncrement`;
                // def = "null"
            }

            // if (field.Field.indexOf("time") >= 0) {
            //     def = "Date.now()";
            // }

            let cache = mysqlModel.getTable(table);
            if (cache && cache == field.Field) {
                code += `
    @sql.cacheId`;
            }

            code += `
    ${field.Field}:${type} = ${def};`
        }

        code += `


}`


        fs.writeFileSync(fileName, code);
    }

    static readFile(path: string): [string, string] {
        let codeStart = "";
        let codeEnd = "";
        let src = fs.readFileSync(path).toString();
        let state = 0;
        dfv.readLine(src, line => {
            if (state == 0)
                codeStart += line + "\r\n";

            if (state == 0 && line.indexOf(mysqlModel.codeStart) >= 0)
                state = 1;

            if (state == 1 && line.indexOf(mysqlModel.codeEnd) >= 0) {
                state = 2;
                codeEnd += "\r\n"
            }

            if (state == 2)
                codeEnd += line + "\r\n";
        });
        return [codeStart, codeEnd];
    }

    static getTable(name: string): string {
        return mysqlModel.cacheTableMap[name];
        // for (let u of mysqlModel.cacheId) {
        //     if (u[0] == name)
        //         return u;
        // }
        // return null;
    }


    static async generate() {



        //await dfvFile.mkdirs(mysqlModel.outMenu())

        let tables: string[] = []
        let data = await db.connecter.queryPromise("show TABLE status");
        for (let u of data) {
            tables.push(u["Name"]);
        }
        mysqlModel.dbClass(tables);

        for (let t of tables) {
            let data = await db.connecter.queryPromise(`show full fields FROM ${t}`);
            mysqlModel.tableClass(t, data)
        }
    }


}


interface FieldInfo {
    Collation: string;
    Comment: string;
    Default: string;
    Extra: string;
    Field: string;
    Key: string;
    Null: string;
    Privileges: string;
    Type: string;
}