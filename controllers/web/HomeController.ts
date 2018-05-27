import { dfv } from 'dfv/src/public/dfv';
import { dfv_user } from './../../models/dfv_user';
import { db } from './../../models/db';
import { dfvContext, route, dfvLib } from "dfv";
import { viewHome } from "../../views/viewHome";
import { sys } from '../../lib/sys';


@route.path("")
export class HomeController {
    /**
     * 不论是koa还是Express的req,resp都被转换为了统一的ctx属性
     */
    ctx: dfvContext;


    /**
     * 首页
     */
    @route.get('/')
    async index() {
        return viewHome.index();
    }

    /**
    * 后台管理
    */
    @route.get()
    manage() {
        return viewHome.manage();
    }



    @route.get()
    async install() {
        await db.connecter.updatePromise(`CREATE TABLE dfv_file  (
            fid bigint(20) NOT NULL AUTO_INCREMENT,
            url varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            add_date bigint(20) NOT NULL DEFAULT 0,
            md5 varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            name varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            \`size\` bigint(20) NOT NULL DEFAULT 0 COMMENT '文件大小字节',
            \`uid\` bigint(20) NOT NULL DEFAULT 0,
            PRIMARY KEY (fid) USING BTREE,
            INDEX add_date(add_date) USING BTREE
          ) ENGINE = InnoDB  CHARACTER SET = utf8;`);
        await db.connecter.updatePromise(` CREATE TABLE dfv_user  (
            uid bigint(20) NOT NULL AUTO_INCREMENT,
            id varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
            password varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码md5+salt',
            email varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            ip varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            auth int(10) NOT NULL DEFAULT 0 COMMENT '0.普通用户 1.编辑 2.管理员',
            \`img\` bigint(20) NOT NULL DEFAULT 0 COMMENT '头像文件',
            \`intro\` text NULL COMMENT '简介',
            reg_time bigint(20) NOT NULL DEFAULT 0 COMMENT '注册时间',
            login_time bigint(20) NOT NULL DEFAULT 0 COMMENT '登陆时间',
            salt varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
            \`state\` int(11) NOT NULL DEFAULT 0 COMMENT '用户状态，0.正常 1.删除',
            token varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '访问令牌',
            \`token_time\` bigint(20) NOT NULL DEFAULT 0 COMMENT 'token生成时间',
            PRIMARY KEY (\`uid\`) USING BTREE,
            UNIQUE INDEX \`id\`(\`id\`) USING BTREE,
            INDEX \`login_time\`(\`login_time\`) USING BTREE
          ) ENGINE = InnoDB  CHARACTER SET = utf8 ;`);

        let u = new dfv_user();
        u.id = "admin";
        u.salt = dfv.getUniqueId16();
        u.password = sys.hashPsw("admin", u.salt);
        u.login_time = Date.now();
        u.auth = 2;
        await db.dfv_user().insert(u);

        return `初始化完成！`
    }

}