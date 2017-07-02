"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const dfv_1 = require("dfv/src/public/dfv");
const db_1 = require("../../models/db");
const dfv_2 = require("dfv");
class mysqlModel {
    /**
     * 创建db class
     * @param tables
     */
    static dbClass(tables) {
        let code = `
import {MysqlConnecter} from "dfv/src/db/MysqlConnecter";
import {SqlBuilder} from "dfv/src/db/SqlBuilder";
import * as cfg from "../config/config";`;
        for (let s of tables) {
            code += `
import {${s}} from "./${s}";`;
        }
        code += `
        
export const db = {
    /**
     * mysql连接
     */
    connecter: new MysqlConnecter(cfg.mysql),

`;
        for (let s of tables) {
            code += `

    /**
     *
     */
    ${s}: () => new SqlBuilder(${s}, db.connecter),`;
        }
        code += `
}`;
        fs.writeFileSync(mysqlModel.dbClassName(), code);
    }
    /**
     * 创建表model
     * @param table
     * @param info
     */
    static tableClass(table, info) {
        let code = `
import {sql} from "dfv/src/public/sql";

export class ${table} {
`;
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
     */`;
            if (field.Key == "PRI") {
                code += `
    @sql.primaryKey`;
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
    ${field.Field}:${type} = ${def};`;
        }
        code += `


}`;
        fs.writeFileSync(path.join(mysqlModel.outMenu(), table + ".ts"), code);
    }
    static getTable(name) {
        return mysqlModel.cacheTableMap[name];
        // for (let u of mysqlModel.cacheId) {
        //     if (u[0] == name)
        //         return u;
        // }
        // return null;
    }
    static generate(cover) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cover && fs.existsSync(mysqlModel.dbClassName()))
                return;
            yield dfv_2.dfvFile.mkdirs(mysqlModel.outMenu());
            let tables = [];
            let data = yield db_1.db.connecter.queryPromise("show TABLE status");
            for (let u of data) {
                tables.push(u["Name"]);
            }
            mysqlModel.dbClass(tables);
            for (let t of tables) {
                let data = yield db_1.db.connecter.queryPromise(`show full fields FROM ${t}`);
                mysqlModel.tableClass(t, data);
            }
        });
    }
}
mysqlModel.outMenu = () => path.join(dfv_1.dfv.root, "runtime", "models");
mysqlModel.dbClassName = () => path.join(mysqlModel.outMenu(), "db.ts");
mysqlModel.cacheTableMap = {};
exports.mysqlModel = mysqlModel;
//# sourceMappingURL=mysqlModel.js.map