import { com } from './../../lib/com';
import { route } from "dfv";
import {
    SelectDelReq,
    SelectInsertReq,
    SelectReq,
    SelectUpdateReq,
    SelectCountReq
} from "../../front/common/temp/SelectReq";
import { db } from "../../models/db";
import { SqlBuilder } from "dfv/src/db/SqlBuilder";
import { dfv } from "dfv/src/public/dfv";
import { ISqlSelectField } from "dfv/src/db/ISqlField";
import { ListResp } from "../../front/common/temp/ListResp";
import { Page } from "../../lib/Page";
import { sql } from "dfv/src/public/sql";
import { dfvContext } from 'dfv/src/dfvContext';
import { checkDbAuth } from '../DbAuthController';

/**
 * 用于前端直接访问数据库,访问权限参照/../DbAuthController.ts文件
 */
export class SelectController {
    ctx!: dfvContext;


    @route.comment("通用删除接口", "", {})
    @route.all()
    async del(dat: SelectDelReq) {
        let s = db[dat.table]() as SqlBuilder<any>;

        if (!s) {
            throw dfv.err("无此表");
        }

        checkDbAuth(this.ctx, "delete", s);
        // if (mysqlModel.cacheTableMap[dat.table]) {
        //     s.cacheRemoveAll()
        // }
        if (dat.where.length > 0) {
            //where条件
            for (let i = 0; i < dat.where.length; i += 3) {
                let w0 = dat.where[i];
                let w1 = dat.where[i + 1];
                let w2 = dat.where[i + 2];

                s.and(f => f[w0][w1].call(f[w0], w2))
            }
        }
        else {
            s.where(f => (f[dat.id_name]).in(dat.ids))
        }

        let res = await s.delete();


        s.cacheRemoveAll();

        return { res: res };
    }


    @route.comment("通用插入接口", "", {})
    @route.all()
    async insert(dat: SelectInsertReq) {
        let s = db[dat.table]() as SqlBuilder<any>;

        if (!s) {
            throw dfv.err("无此表");
        }

        if (dat.obj == null) {
            throw dfv.err("添加内容不能为空");
        }

        checkDbAuth(this.ctx, "insert", s);

        if (dat.obj instanceof Array) {
            dat.obj.forEach(it => {
                com.xssObject(it);
            });
        }
        else {
            com.xssObject(dat.obj);
        }

        let res = await s.insert(dat.obj);
        return { res: res };
    }

    @route.comment("通用更新接口", "", {})
    @route.all()
    async update(dat: SelectUpdateReq) {
        let s = db[dat.table]() as SqlBuilder<any>;

        if (!s) {
            throw dfv.err("无此表");
        }


        if (dat.sets.length % 3 > 0) {
            throw dfv.err("sets条件错误");
        }

        checkDbAuth(this.ctx, "update", s);

        if (dat.where.length > 0) {
            //where条件
            for (let i = 0; i < dat.where.length; i += 3) {
                let w0 = dat.where[i];
                let w1 = dat.where[i + 1];
                let w2 = dat.where[i + 2];

                s.and(f => f[w0][w1].call(f[w0], w2))
            }
        }
        else {
            s.where(f => (f[dat.id_name]).eq(dat.id));
        }


        //where条件
        for (let i = 0; i < dat.sets.length; i += 3) {
            let w0 = dat.sets[i];
            let op = dat.sets[i + 1]
            let w1 = dat.sets[i + 2];
            if (typeof w1 === "string") {
                w1 = com.xssStr(w1);
            }

            s.set(f => f[w0][op](w1));
        }

        let res = await s.update()


        s.cacheRemoveAll();

        return { res: res };
    }

    @route.comment("通用列表count接口", "", {})
    @route.all()
    async count(dat: SelectCountReq) {
        let s = db[dat.table]() as SqlBuilder<any>;

        if (!s) {
            throw dfv.err("无此表");
        }

        if (dat.where.length % 3 > 0) {
            throw dfv.err("条件错误");
        }

        if (dat.order.length % 2 > 0) {
            throw dfv.err("order条件错误");
        }

        //where条件
        for (let i = 0; i < dat.where.length; i += 3) {
            let w0 = dat.where[i];
            let w1 = dat.where[i + 1];
            let w2 = dat.where[i + 2];

            s.and(f => f[w0][w1].call(f[w0], w2))
        }


        if (dat.num > 0)
            s.limit(dat.skip, dat.num);



        for (let i = 0; i < dat.order.length; i += 2) {
            s.order(f => f[dat.order[i]][dat.order[i + 1]]())
        }

        let res = await s.count();

        return { res: res };
    }

    @route.comment("通用列表查询接口", "", new ListResp)
    @route.all()
    async list(dat: SelectReq) {
        let s = db[dat.table]() as SqlBuilder<any>;

        if (!s) {
            throw dfv.err("无此表");
        }

        if (dat.where.length % 3 > 0) {
            throw dfv.err("条件错误");
        }

        if (dat.order.length % 2 > 0) {
            throw dfv.err("order条件错误");
        }

        checkDbAuth(this.ctx, "select", s);

        //where条件
        for (let i = 0; i < dat.where.length; i += 3) {
            let w0 = dat.where[i];
            let w1 = dat.where[i + 1];
            let w2 = dat.where[i + 2];

            s.and(f => f[w0][w1].call(f[w0], w2))
        }

        let res = new ListResp();


        //总条目数
        if (dat.count > 0) {
            res.count = await s.count();
        }
        else {
            delete res.count;
        }


        if (dat.goto > 0) {
            if (dat.old) {
                s.limit((dat.goto - 1) * dat.num, dat.num)
                if (dat.second_name.length > 0)
                    s.order(s => s[dat.second_name].asc() + s[dat.id_name].asc());
                else
                    s.order(s => s[dat.id_name].asc());
            }
            else {
                s.limit((dat.goto - 1) * dat.num, dat.num);
                if (dat.second_name.length > 0)
                    s.order(s => s[dat.second_name].desc() + s[dat.id_name].desc());
                else
                    s.order(s => s[dat.id_name].desc());
            }
        }
        else {
            //分页
            if (dat.second_name.length > 0) {
                Page.pageIng(dat.old, dat.id, s, s => s[dat.id_name], dat.second_id, s => s[dat.second_name]);
            }
            else if (dat.id_name.length > 0) {
                Page.pageIng(dat.old, dat.id, s, s => s[dat.id_name]);
            }

            if (dat.num > 0)
                s.limit(dat.skip, dat.num);
        }


        for (let i = 0; i < dat.order.length; i += 2) {
            s.order(f => f[dat.order[i]][dat.order[i + 1]]())
        }

        res.list = await s.toArray();

        return res;
    }
}