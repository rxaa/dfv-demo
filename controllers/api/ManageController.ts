import { FileController } from './FileController';
import { Page } from './../../lib/Page';
import { dfvLib, route, dfvFile } from "dfv";
import { LoginReq, DelFileReq } from "../../models/ManaReq";
import { db } from "../../models/db";
import { dfv } from "dfv/src/public/dfv";
import { dfv_user } from "../../models/dfv_user";
import { sys } from "../../lib/sys";
import { dfvContext } from "dfv/src/dfvContext";
import { RouteController } from '../RouteController';

export class ManageController {
    ctx!: dfvContext;

    @route.comment("后台登陆", "", new dfv_user())
    @route.noAuth()
    @route.all()
    async login(dat: LoginReq) {
        let user = await db.dfv_user().where(f => f.id.eq(dat.id)).toOne();
        if (!user)
            throw dfv.err("用户不存在！");

        if (user.password != sys.hashPsw2(dat.psw, user.salt))
            throw dfv.err("密码不正确")

        if (user.auth <= dfv_user.authNormal)
            throw dfv.err("权限不足！");

        /**
         * 重新登陆，token有效期3小时
         */
        if (user.token == "" || Date.now() - user.token_time > 3 * 60 * 60 * 1000) {
            user.token = dfv.getUniqueId16();
            user.token_time = Date.now();
        }

        user.login_time = Date.now();
        user.ip = sys.getRealIp(this.ctx);

        await db.dfv_user().updateById(user);

        db.dfv_user().cacheRemove(user.uid);

        delete user.password;
        delete user.salt;

        return user;
    }


    @route.comment("删除文件", "", {})
    @route.all()
    async del_file(dat: DelFileReq) {
        this.checkUserAuth();

        let s = db.dfv_file().where(f => f.fid.in(dat.fids));
        let list = await s.toArray();
        list.forEach(it => dfvFile.unlink(FileController.fileMenu() + it.url));
        await s.delete();

        return {};
    }

    /**
     * 检查权限
     */
    checkUserAuth() {
        let user = RouteController.getUserInfo(this.ctx);
        if (!user)
            throw dfv.err("没有登录信息！");

        if (user.auth <= dfv_user.authNormal)
            throw dfv.err("权限不足！");
    }
}