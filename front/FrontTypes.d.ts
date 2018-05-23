/**
 *
 * @param val 原始字符串
 * @param HMACkey
 * @param raw Calculate the raw MD5 hash of a given string value
 */
declare function md5(val: string, HMACkey?: string, raw?: boolean): string;

declare interface LaydateDate {
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number
}

declare interface LaydatePara {
    format?: string;//'YYYY/MM/DD hh:mm:ss'
    elem?: any;
    istime?: boolean;//是否开启时间选择
    isclear?: boolean, //是否显示清空
    istoday?: boolean; //是否显示今天
    min?: number;//laydate.now(-1)-1代表昨天，-2代表前天，以此类推
    max?: number; //laydate.now(+1)+1代表明天，+2代表后天，以此类推 '2099-06-16 23:59:59', //最大日期
    change?: (value: string, date: LaydateDate, endDate: LaydateDate) => void;


    show?:boolean;
    /**
     * 控件选择完毕后的回调
     * @param {string} value
     * @param {LaydateDate} date
     * @param {LaydateDate} endDate
     */
    done?: (value: string, date: LaydateDate, endDate: LaydateDate) => void;
    /**
     * 主题颜色
     */
    theme?:string;
}


declare module laydate {
    function now(val?: number): number;


    function render(dat: LaydatePara);
}