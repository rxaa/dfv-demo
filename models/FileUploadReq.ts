import { valid } from "dfv/src/public/valid";

export enum ThumType {
    //原图
    original = 0,
    small,
    normal,
    center,
}


export class FileReq {

    /**
     *
     * 文件id
     */
    fid = 0;

    /**
     * 缩略图(可选参数)0.原图 1.小 2.中 3.裁剪小图400*300
     */
    thum = ThumType.original;

}

export class UploadReq {


    /**
     * 文件内容
     */
    file = valid.file();

}