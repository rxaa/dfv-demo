import { dfvLib, route } from "dfv";
import { LoginReq } from "../../models/ManaReq";
import { db } from "../../models/db";
import { dfv } from "dfv/src/public/dfv";
import { dfv_user } from "../../models/dfv_user";
import { sys } from "../../lib/sys";

export class ManageController {


    @route.comment("后台登陆", "", new dfv_user())
    @route.noAuth()
    @route.all()
    async login(dat: LoginReq) {
        let user = await db.dfv_user().where(f => f.id.eq(dat.id)).toOne();
        if (!user)
            throw dfv.err("用户不存在！");

        if (user.password != sys.hashPsw2(dat.psw, user.salt))
            throw dfv.err("密码不正确")

        if (user.auth < 1)
            throw dfv.err("权限不足！");
        return user;
    }


}