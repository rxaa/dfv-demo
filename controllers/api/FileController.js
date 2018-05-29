"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouteController_1 = require("./../RouteController");
const dfv_file_1 = require("./../../models/dfv_file");
const dfv_1 = require("dfv");
const db_1 = require("../../models/db");
const dfv_2 = require("dfv/src/public/dfv");
const FileUploadReq_1 = require("../../models/FileUploadReq");
const path = require("path");
const com_1 = require("../../lib/com");
class FileController {
    /**
     * 文件上传目录
     */
    static fileMenu() {
        return dfv_2.dfv.root + "/runtime/file/";
    }
    /**
     * 下载文件
     */
    async get(dat) {
        if (dat.fid < 1) {
            this.ctx.status = 404;
            this.ctx.body = "错误的fid";
            return;
        }
        let file = await db_1.db.dfv_file().cacheGetInt(dat.fid);
        if (file.length < 1) {
            this.ctx.status = 404;
            this.ctx.body = "文件不存在";
            return;
        }
        let url = FileController.fileMenu() + file[0].url;
        this.ctx.response.sendFile(url, err => {
            if (!err)
                return;
            try {
                this.ctx.response.status(404).send("文件不存在");
            }
            catch (e) {
                dfv_1.dfvLog.err(e);
            }
            dfv_1.dfvLog.err(err);
        });
    }
    /**
     * 上传文件
     * @param dat
     */
    async upload(dat) {
        if (!FileController.matchSuffix(dat.file.name, [".jpeg", ".jpg", ".bmp", ".png", ".gif"])) {
            throw dfv_2.dfv.err("只允许上传图片！");
        }
        if (!dat) {
            throw dfv_2.dfv.err("没有数据");
        }
        let user = RouteController_1.RouteController.getUserInfo(this.ctx);
        if (!user) {
            throw dfv_2.dfv.err("缺少用户信息");
        }
        dat.file.name = com_1.com.xssStr(dat.file.name);
        let d = new Date();
        let time = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDay() + "/";
        let menu = FileController.fileMenu() + "/" + time;
        let file = dfv_2.dfv.getUniqueId16() + path.extname(dat.file.name);
        await dfv_1.dfvFile.mkdirs(menu);
        await dfv_1.dfvFile.rename(dat.file.path, menu + file);
        let fi = new dfv_file_1.dfv_file();
        fi.url = time + file;
        fi.add_date = Date.now();
        fi.md5 = dat.file.hash;
        fi.name = dat.file.name;
        fi.uid = user.uid;
        fi.size = dat.file.size;
        let res = await db_1.db.dfv_file().insert(fi);
        return {
            fid: fi.fid,
            url: "/" + fi.url,
        };
    }
    /**
     * 匹配指定后缀名
     * @param name
     * @param fileType
     */
    static matchSuffix(name, fileType) {
        let si = name.lastIndexOf(".");
        if (si > 0) {
            let sufixName = name.substring(si, name.length).toLowerCase();
            for (let s of fileType) {
                if (sufixName === s)
                    return true;
            }
        }
        return false;
    }
}
__decorate([
    dfv_1.route.get(),
    dfv_1.route.noAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileUploadReq_1.FileReq]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "get", null);
__decorate([
    dfv_1.route.multipart(form => {
        form.hash = "md5";
        form.uploadDir = dfv_2.dfv.getTemp();
        form.maxFileSize = 1024 * 1024 * 10 * 5;
    }),
    dfv_1.route.post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileUploadReq_1.UploadReq]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "upload", null);
exports.FileController = FileController;
//# sourceMappingURL=FileController.js.map