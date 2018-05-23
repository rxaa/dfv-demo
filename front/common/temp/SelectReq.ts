import { valid } from "dfv/src/public/valid";
import { arrayString } from "dfv/src/public/dfv";

export class SelectCountReq {
    /**
     * 表名
     */
    @valid.stringNotEmpty()
    table = "";

    /**
     * limit数量
     */
    @valid.int(r => r.val >= 0 && r.val < 1000, "num 0-1000以内")
    num = 0;


    /**
     * skip位置
     */
    skip = 0;


    /**
     * 查询条件，三目操作
     */
    @valid.array(r => r.val.length >= 0)
    where = Array<any>();

    /**
     * 排序条件，双目操作
     */
    order = arrayString();

    /**
     * 分组条件，单目操作
     */
    group = Array<any>();
}

export class SelectReq {

    /**
     * 表名
     */
    @valid.stringNotEmpty()
    table = "";


    /**
     * limit数量
     */
    @valid.int(r => r.val >= 0 && r.val < 1000, "num 0-1000以内")
    num = 0;


    /**
     * skip位置
     */
    skip = 0;


    /**
     * 主键id名
     */
    id_name = "";

    /**
     * 主键id(可选,刷新传最大id,加载旧数据传最小id)
     */
    id = "";

    /**
     * 次要排序字段
     */
    second_name = "";

    second_id: any = null;

    /**
     * 是否加载旧数据
     */
    old = 0;

    /**
     * 查询条件，三目操作
     */
    @valid.array(r => r.val.length >= 0)
    where = Array<any>();

    /**
     * 是否返回总条目数
     */
    count = 0;


    /**
     * 排序条件，双目操作
     */
    order = arrayString();

    /**
     * 分组条件，单目操作
     */
    group = Array<any>();


    /**
     * 跳页
     */
    goto = 0;
}

export class SelectDelReq {

    /**
     * 表名
     */
    @valid.stringNotEmpty()
    table = "";


    /**
     * 主键id名
     */
    id_name = "";

    /**
     * 主键id(可选,刷新传最大id,加载旧数据传最小id)
     */
    @valid.array(r => r.val.eachToString())
    ids = arrayString();


    /**
     * 查询条件，三目操作
     */
    @valid.array(r => r.val.length >= 0)
    where = Array<any>();
}

export class SelectInsertReq {

    /**
     * 表名
     */
    @valid.stringNotEmpty()
    table = "";


    /**
     * 插入的对象
     * @type {any}
     */
    obj: any = null;


}

export class SelectUpdateReq {

    /**
     * 表名
     */
    @valid.stringNotEmpty()
    table = "";


    /**
     * 主键id名
     */
    id_name = "";

    /**
     * 主键id(可选,刷新传最大id,加载旧数据传最小id)
     */
    id = "";

    /**
     * 查询条件，三目操作
     */
    @valid.array(r => r.val.length >= 0)
    where = Array<any>();

    /**
     * sets条件 三目条件
     */
    @valid.array(r => r.val.length >= 0)
    sets = Array<any>();

}

export class UploadRes {
    fid: number = 0;
    url = "";
}