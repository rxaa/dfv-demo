import { valid } from "dfv/src/public/valid";

export class LoginReq {
    @valid.stringNotEmpty(null, "账号不能为空！")
    id = "";

    /**
     * 密码的md5值
     */
    @valid.stringNotEmpty(null, "密码不能为空！")
    psw = "";
}
