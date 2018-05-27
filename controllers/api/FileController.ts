import { RouteController } from './../RouteController';
import { dfv_file } from './../../models/dfv_file';
import { dfvContext, dfvFile, dfvLog, route } from "dfv";
import { db } from "../../models/db";
import { dfv } from "dfv/src/public/dfv";
import { valid } from "dfv/src/public/valid";
import { FileReq, UploadReq } from "../../models/FileUploadReq";
import * as path from "path"
import { UploadRes } from "../../front/common/temp/SelectReq";


export class FileController {
    ctx!: dfvContext;

    /**
     * 文件上传目录
     */
    static fileMenu() {
        return dfv.root + "/runtime/file/";
    }



    /**
     * 下载文件
     */
    @route.get()
    @route.noAuth()
    async get(dat: FileReq) {
        if (dat.fid < 1) {
            this.ctx.status = 404;
            this.ctx.body = "错误的fid";
            return;
        }

        let file = await db.dfv_file().cacheGetInt(dat.fid);
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
            } catch (e) {
                dfvLog.err(e);
            }
            dfvLog.err(err);
        });
    }


    /**
     * 上传文件
     * @param dat 
     */
    @route.multipart(form => {
        form.hash = "md5";
        form.uploadDir = dfv.getTemp()
        form.maxFileSize = 1024 * 1024 * 10 * 5;
    })
    @route.post()
    async upload(dat: UploadReq) {
        if (!FileController.matchSuffix(dat.file.name, [".jpeg", ".jpg", ".bmp", ".png", ".gif"])) {
            throw dfv.err("只允许上传图片！");
        }

        if (!dat) {
            throw dfv.err("没有数据");
        }

        let user = RouteController.getUserInfo(this.ctx);
        if (!user) {
            throw dfv.err("缺少用户信息");
        }


        let d = new Date();

        let time = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDay() + "/";
        let menu = FileController.fileMenu() + "/" + time;
        let file = dfv.getUniqueId16() + path.extname(dat.file.name);


        await dfvFile.mkdirs(menu);
        await dfvFile.rename(dat.file.path, menu + file);

        let fi = new dfv_file();
        fi.url = time + file;
        fi.add_date = Date.now();
        fi.md5 = dat.file.hash!;
        fi.name = dat.file.name;
        fi.uid = user.uid;
        fi.size = dat.file.size;
        let res = await db.dfv_file().insert(fi);
        return {
            fid: fi.fid,
            url: "/" + fi.url,
        } as UploadRes;
    }


    /**
     * 匹配指定后缀名
     * @param name 
     * @param fileType 
     */
    static matchSuffix(name: string, fileType: string[]) {
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