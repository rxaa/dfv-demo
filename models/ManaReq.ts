import { com } from './../lib/com';
import { array, arrayNumber } from 'dfv/src/public/dfv';
import { valid } from "dfv/src/public/valid";

export class LoginReq {
    @valid.stringNotEmpty(f => com.xss(f), "账号不能为空！")
    id = "";

    /**
     * 密码的md5值
     */
    @valid.stringNotEmpty(f => com.xss(f), "密码不能为空！")
    psw = "";

    /**
    * 是否记住密码
    */
    rember = 0;
}

export class DelFileReq {


    @valid.array<number>(f => f.val.length > 0 && f.val.eachToInt(), "文件id不能为空")
    fids = arrayNumber();

}
