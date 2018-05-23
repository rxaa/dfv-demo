import {SqlBuilder} from "dfv/src/db/SqlBuilder";

export class Page {
    static pageNum = 20;

    /**
     * 下拉上拉分页
     * @param old 是否旧数据
     * @param id 排序id数据
     * @param s
     * @param func 指定排序id字段
     * @param secondDat 第二排序字段数据
     * @param secondFunc
     */
    static pageIng<T>(old: number, id: string, s: SqlBuilder<T>, func: (s: T)=>any, secondDat?: number|string, secondFunc?: (s: T)=>any) {
        if (old) {
            if (id.length > 1) {
                if (secondFunc)
                    s.and(f => secondFunc(f).le(secondDat) | secondFunc(f).eq(secondDat) & func(f).le(id))
                        .order(f => secondFunc(f).desc() + func(f).desc())
                else
                    s.and(f => func(f).le(id)).order(f => func(f).desc())
            }
            else {
                if (secondFunc)
                    s.order(f => secondFunc(f).asc() + func(f).asc())
                else
                    s.order(f => func(f).asc())
            }
        }
        else {
            if (id.length > 1) {
                if (secondFunc)
                    s.and(f => secondFunc(f).gt(secondDat) | secondFunc(f).eq(secondDat) & func(f).gt(id))
                        .order(f => secondFunc(f).asc() + func(f).asc())
                else
                    s.and(f => func(f).gt(id)).order(f => func(f).asc())
            }
            else {
                if (secondFunc)
                    s.order(f => secondFunc(f).desc() + func(f).desc())
                else
                    s.order(f => func(f).desc())
            }
        }
    }

}
