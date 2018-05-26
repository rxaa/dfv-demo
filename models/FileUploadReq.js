"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_1 = require("dfv/src/public/valid");
var ThumType;
(function (ThumType) {
    //原图
    ThumType[ThumType["original"] = 0] = "original";
    ThumType[ThumType["small"] = 1] = "small";
    ThumType[ThumType["normal"] = 2] = "normal";
    ThumType[ThumType["center"] = 3] = "center";
})(ThumType = exports.ThumType || (exports.ThumType = {}));
class FileReq {
    constructor() {
        /**
         *
         * 文件id
         */
        this.fid = 0;
        /**
         * 缩略图(可选参数)0.原图 1.小 2.中 3.裁剪小图400*300
         */
        this.thum = ThumType.original;
    }
}
exports.FileReq = FileReq;
class UploadReq {
    constructor() {
        /**
         * 文件内容
         */
        this.file = valid_1.valid.file();
    }
}
exports.UploadReq = UploadReq;
//# sourceMappingURL=FileUploadReq.js.map