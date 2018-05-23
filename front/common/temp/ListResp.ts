export class ListResp<T> {
    /**
     * 数据列表
     */
    list: Array<T> = [];

    /**
     * 总条目数
     */
    count = 0;
}
