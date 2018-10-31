"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListTemp_1 = require("../common/temp/ListTemp");
const dfv_user_1 = require("../../models/dfv_user");
const mana_1 = require("./mana");
const dfv_1 = require("dfv/src/public/dfv");
const com_1 = require("../../lib/com");
const TempTextEdit_1 = require("../common/temp/TempTextEdit");
const TempUploadEdit_1 = require("../common/temp/TempUploadEdit");
class UserManageView {
    static list() {
        let v = ListTemp_1.newListTemp(dfv_user_1.dfv_user, "用户", dfv_user_1.dfv_user);
        // v.disableDelete();
        v.setPrimaryKey({ uid: 1 });
        // v.setOrderAsc();
        //搜索按钮条件
        v.onSearch = () => {
            if (v.dat.name)
                v.db.and(f => f.id.like(v.dat.name + "%"));
            v.addDateWhere(f => f.login_time);
        };
        v.view.insertExtView = ins => {
            //ins.password = com.hashPsw(ins.password, ins.salt);
        };
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
            login_time: mana_1.mana.showDate(),
            auth: mana_1.mana.showList(dfv_user_1.dfv_user.autoStr),
            img: mana_1.mana.imgSmall(),
        });
        /**
         * 字段编辑函数
         */
        v.setEditAddFiled({
            id: mana_1.mana.string(1, 255),
            password: new TempTextEdit_1.TempTextEdit({
                validEdit: (val, e) => {
                    if (e.isAdd && val.length < 4)
                        throw Error("不能少于4位");
                    if (val.length == 0) {
                        return e.dat.password;
                    }
                    e.dat.salt = dfv_1.dfv.getUniqueId16();
                    return com_1.com.hashPsw(val, e.dat.salt);
                }, password: true
            }),
            img: new TempUploadEdit_1.TempUploadEdit(),
            intro: mana_1.mana.stringRich(1),
            email: mana_1.mana.string(1, 255),
            auth: mana_1.mana.editList(dfv_user_1.dfv_user.autoStr),
        });
        v.setCustomField({});
        return v.render();
    }
}
exports.UserManageView = UserManageView;
//# sourceMappingURL=UserManageView.js.map