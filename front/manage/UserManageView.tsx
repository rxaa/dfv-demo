import * as React from "dfv/src/public/dfvReact";

import { newListTemp } from '../common/temp/ListTemp';
import { dfv_user } from '../../models/dfv_user';
import { mana } from './mana';
import { dfv } from 'dfv/src/public/dfv';
import { com } from '../../lib/com';
import { dfvBind } from "dfv/src/public/dfvBind";
import { TempTextEdit } from "../common/temp/TempTextEdit";
import { TempUploadEdit } from "../common/temp/TempUploadEdit";
export class UserManageView {

    static list() {
        let v = newListTemp(dfv_user, "用户", dfv_user);

        // v.disableDelete();

        v.setPrimaryKey({ uid: 1 });

        // v.setOrderAsc();

        //搜索按钮条件
        v.onSearch = () => {

            if (v.dat.name)
                v.db.and(f => f.id.like(v.dat.name + "%"));

            v.addDateWhere(f => f.login_time);

        }

        v.view.insertExtView = ins => {

            //ins.password = com.hashPsw(ins.password, ins.salt);
        }

        /**
         * 表单显示的字段
         */
        v.setShowField({
            uid: "uid",
            id: "账号",
            img: "头像",
            intro: "简介",
            email: "邮箱",
            auth: "权限",
            login_time: "登录日期",
        });
        v.cfg.showFieldMap["password"] = "密码";

        /**
         * 字段显示函数
         */
        v.setShowFunc({
            login_time: mana.showDate(),
            auth: mana.showList(dfv_user.autoStr),
            img: mana.imgSmall(),
        });



        /**
         * 字段编辑函数
         */
        v.setEditAddFiled({
            id: mana.string(1, 255),
            password: new TempTextEdit((val: string, e) => {

                if (e.isAdd && val.length < 4)
                    throw Error("不能少于4位");

                if (val.length == 0) {
                    return e.dat.password;
                }
                e.dat.salt = dfv.getUniqueId16();
                return com.hashPsw(val, e.dat.salt);
            }, true),
            img: new TempUploadEdit(),
            intro: mana.stringRich(1),
            email: mana.string(1, 255),
            auth: mana.editList(dfv_user.autoStr),
        });

        v.setCustomField({

        })


        return v.render();
    }
}