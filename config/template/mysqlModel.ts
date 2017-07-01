import * as fs from "fs";
import * as path from "path";
import {dfv} from "dfv/src/public/dfv";
import {db} from "../../models/db";
import {dfvFile} from "dfv";

export class mysqlModel {

    static outMenu = () => path.join(dfv.root, "runtime", "models");

    static dbClassName = () => path.join(mysqlModel.outMenu(), "db.ts");

    static cacheTableMap = {
        // ts_goods_pic: "gid",
    }


    /**
     * 创建db class
     * @param tables
     */
    static dbClass(tables: string[]) {
        let code = `
import {MysqlConnecter} from "dfv/src/db/MysqlConnecter";
import {SqlBuilder} from "dfv/src/db/SqlBuilder";
import * as cfg from "../config/config";`;

        for (let s of tables) {
            code += `
import {${s}} from "./${s}";`
        }

        code += `
        
export const db = {
    /**
     * mysql连接
     */
    connecter: new MysqlConnecter(cfg.mysql),

`
        for (let s of tables) {
            code += `

    /**
     *
     */
    ${s}: () => new SqlBuilder(${s}, db.connecter),`
        }

        code += `
}`

        fs.writeFileSync(mysqlModel.dbClassName(), code);
    }

    /**
     * 创建表model
     * @param table
     * @param info
     */
    static tableClass(table: string, info: FieldInfo[]) {
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

        fs.writeFileSync(path.join(mysqlModel.outMenu(), table + ".ts"), code);
    }

    static getTable(name: string): string {
        return mysqlModel.cacheTableMap[name];
        // for (let u of mysqlModel.cacheId) {
        //     if (u[0] == name)
        //         return u;
        // }
        // return null;
    }


    static async generate(cover?: boolean) {

        if (!cover && fs.existsSync(mysqlModel.dbClassName()))
            return;

        await dfvFile.mkdirs(mysqlModel.outMenu())

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