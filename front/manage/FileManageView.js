"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const ListTemp_1 = require("../common/temp/ListTemp");
const mana_1 = require("./mana");
const com_1 = require("../../lib/com");
const dfv_file_1 = require("../../models/dfv_file");
const dfvWindow_1 = require("dfv/src/public/dfvWindow");
const apiFront_1 = require("../apiFront");
class FileManageView {
    static list() {
        let v = ListTemp_1.newListTemp(dfv_file_1.dfv_file, "文件", dfv_file_1.dfv_file);
        // v.disableDelete();
        v.view.addButton = () => {
        };
        v.view.editAllButton = () => {
        };
        v.setPrimaryKey({ fid: 1 });
        // v.setOrderAsc();
        //搜索按钮条件
        v.onSearch = () => {
            if (v.dat.name)
                v.db.and(f => f.name.like(v.dat.name + "%"));
            v.addDateWhere(f => f.add_date);
        };
        v.onDelClick = dels => {
            let wind = new dfvWindow_1.dfvWindow();
            wind.addCover();
            wind.showWithOk("<b>删除</b>", React.createElement("div", { class: "pad8" },
                "\u786E\u5B9A\u8981\u5220\u9664",
                dels.length,
                "\u6761\u8BB0\u5F55\uFF1F"), async (e) => {
                wind.close();
                await apiFront_1.apiFront.manage_del_file({
                    fids: dels.map(it => it.dat.fid),
                }).resp();
                v.dat.count -= dels.length;
                v.countPage();
                v.loadList();
            });
        };
        v.view.insertExtView = ins => {
        };
        /**
         * 表单显示的字段
         */
        v.setShowField({
            fid: "文件",
            url: "url",
            add_date: "创建日期",
            size: "大小",
            uid: "uid",
        });
        /**
         * 字段显示函数
         */
        v.setShowFunc({
            add_date: mana_1.mana.showDate(),
            fid: mana_1.mana.imgSmall(),
            size: (it) => com_1.com.bytesToSize(it),
        });
        /**
         * 字段编辑函数
         */
        v.setEditAddFiled({
        //url: mana.string(1, 255),
        });
        v.setCustomField({});
        return v.render();
    }
}
exports.FileManageView = FileManageView;
//# sourceMappingURL=FileManageView.js.map