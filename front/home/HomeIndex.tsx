import * as React from "dfv/src/public/dfvReact";
import { RichText } from "../common/temp/RichText"

export class HomeIndex {


    constructor() {

    }

    render() {
        return <div class="pad10">
            <p class="back_yellow pad10">欢迎来到首页！</p>
            <a class="pad10 back_green" href="/manage">后台管理</a>
        </div>
    }
}