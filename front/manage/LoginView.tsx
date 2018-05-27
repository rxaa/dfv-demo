import * as React from "dfv/src/public/dfvReact";
import { valid } from "dfv/src/public/valid";
import { dfvBind } from "dfv/src/public/dfvBind";
import { LoginReq } from "../../models/ManaReq";
import { bindNotEmpty, com } from "../../lib/com";
import { apiFront } from "../apiFront";
import { ComData } from "../ComData";
import { mana } from "./mana";

export class LoginView {

    dat = valid.bindAble(LoginReq)

    render = () =>
        <div class="h_m">
            <tt class="m_p_t10 back_white pad20">
                <div class="blue font_5 bold">
                    系统登录
                </div>
                <div class="mar15t">
                    账号:
                    <input class="txt_blue" type="text" title='账号'
                        value={bindNotEmpty(e => this.dat.id)} />
                    <div></div>
                    <span class="red" />
                </div>
                <div class="mar10t">
                    密码:
                    <input class="txt_blue" type="password" title='密码'
                        value={bindNotEmpty(e => this.dat.psw)} />
                    <div></div>
                    <span class="red" />
                </div>
                <label>
                    <input class="mar10t" type="checkbox" checked={dfvBind(e => this.dat.rember)} />记住密码
                </label>
                <div class="mar10t">
                    <button class="button_blue bold pad10 font_1" onclick={e => this.onLogin()}>
                        &nbsp;登录&nbsp;
                    </button>
                </div>
            </tt>
        </div>

    async onLogin() {
        if (!(await valid.checkAsync(this.dat)).ok) {
            return;
        }
        let res = await apiFront.manage_login({
            id: this.dat.id,
            psw: ComData.md5(this.dat.psw),
            rember: this.dat.rember
        }).resp();

        ComData.user.dat = res;
        if (this.dat.rember)
            ComData.user.save();

        mana.init();
    }
}
