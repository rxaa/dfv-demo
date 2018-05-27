import * as React from "dfv/src/public/dfvReact";

import { newListTemp } from '../common/temp/ListTemp';
import { mana } from './mana';
import { dfv } from 'dfv/src/public/dfv';
import { com } from '../../lib/com';
import { dfvBind } from "dfv/src/public/dfvBind";
import { TempTextEdit } from "../common/temp/TempTextEdit";
import { TempUploadEdit } from "../common/temp/TempUploadEdit";
import { dfv_file } from "../../models/dfv_file";
import { dfvWindow } from "dfv/src/public/dfvWindow";
import { apiFront } from "../apiFront";
export class FileManageView {

    static list() {
        let v = newListTemp(dfv_file, "文件", dfv_file);

        // v.disableDelete();
        v.view.addButton = () => {

        }
        v.view.editAllButton = () => {

        }

        v.setPrimaryKey({ fid: 1 });

        // v.setOrderAsc();

        //搜索按钮条件
        v.onSearch = () => {

            if (v.dat.name)
                v.db.and(f => f.name.like(v.dat.name + "%"));

            v.addDateWhere(f => f.add_date);

        }

        v.onDelClick = dels => {
            let wind = new dfvWindow();
            wind.addCover();
            wind.showWithOk("<b>删除</b>", <div class="pad8">确定要删除{dels.length}条记录？</div>, async (e) => {
                wind.close();

                await apiFront.manage_del_file({
                    fids: dels.map(it => it.dat.fid),
                }).resp();

                v.dat.count -= dels.length;
                v.countPage()
                v.loadList();
            });
        }

        v.view.insertExtView = ins => {
        }

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
            add_date: mana.showDate(),
            fid: mana.imgSmall(),
            size: (it: number) => com.bytesToSize(it),
        });


        /**
         * 字段编辑函数
         */
        v.setEditAddFiled({
            //url: mana.string(1, 255),
        });

        v.setCustomField({

        })


        return v.render();
    }
}