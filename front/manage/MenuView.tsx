import * as React from "dfv/src/public/dfvReact";
import { mana } from "./mana";
import { dfvFront } from "dfv/src/public/dfvFront";
import { dfvWindow } from "dfv/src/public/dfvWindow";
import { LoadEvent } from "../common/LoadEvent";
import { TreeMenuData, TreeMenu } from "../common/component/TreeMenu";
import { UserManageView } from "./UserManageView";
import { com } from "../../lib/com";
import { ComData } from "../ComData";
import { dfv_user } from "../../models/dfv_user";
import { FileManageView } from "./FileManageView";


export class MenuView {

    welcome() {
        return <div class="pad10 back_yellow mar10">
            <p>[<span class="blue">{ComData.user.dat.id}</span>],欢迎登录！</p>
            <p>权限:<span class="blue">{dfv_user.autoStr[ComData.user.dat.auth]}</span></p>
            <p>登录ip:<span class="blue">{ComData.user.dat.ip}</span></p>

        </div>
    }

    menu: TreeMenuData = {
        '主页': [
            [`欢迎页面`, e => this.setContent(this.welcome())],

        ],
        "系统": [
            [`用户管理`, e => this.setContent(UserManageView.list())],
            [`文件管理`, e => this.setContent(FileManageView.list())],
        ],
    }

    treeMenu = new TreeMenu();


    content: HTMLDivElement;


    constructor() {

        this.init()

    }

    async init() {

        this.treeMenu.onItemClick = e => {
            this.unFold();
        }
    }

    header = () =>
        <div class="pad10">
            <a class="pad10 hover_yelow white" href="/">首页</a>
            <span class="pad10 hover_yelow" onclick={e => this.logout()}>退出登陆</span>
        </div>



    render = () =>
        com.hasMobile() ?
            this.renderMobile()
            :
            <div class="flex flex-row height_p100">
                <div class="height_p100 auto_over">
                    {this.treeMenu.render(this.menu)}
                </div>
                <div class="flex flex-col">
                    <div class="ba_blue2 white flex-row x-end">
                        {this.header()}
                    </div>
                    {this.content = <div class="flex flex-col auto_over">
                        {this.welcome()}
                    </div>
                    }
                </div>
            </div>


    onMenuFold() {
        if (this.leftMenu.style.left == "0px") {
            this.unFold();
        }
        else {
            this.leftMenu.style.left = "0px";
        }
    }

    unFold() {
        if (this.leftMenu)
            this.leftMenu.style.left = "-" + this.leftMenu.offsetHeight + "px";
    }

    leftMenu: HTMLDivElement;
    renderMobile = () => {
        let v = <div class="width_p100 height_p100">
            <div class="fixed width_p100 top0">
                <div class="ba_blue2 white flex-row">
                    <span class="flex pad10 hover_yelow inline" onclick={e => this.onMenuFold()}>菜单</span>
                    {this.header()}
                </div>
                {this.leftMenu = <div class="fixed z999">
                    {this.treeMenu.render(this.menu)}
                </div>}
            </div>
            {this.content = <div class="pad35t height_p100 flex-col">
                {this.welcome()}
            </div>}

        </div>


        setTimeout(() => {
            this.leftMenu.style.left = "-" + this.leftMenu.offsetHeight + "px";
            this.leftMenu.className += " anim_left";
        }, 0);

        return v;
    }


    /**
     * 设置content视图
     * @param e
     */
    setContent(e: HTMLElement | string) {
        if (!e)
            return;

        LoadEvent.pushFunc(() => {
            dfvFront.setEle(this.content, e);
        })
    }

    logout() {
        let d = new dfvWindow()
        d.addCover();
        d.showWithOk("退出登陆", "确定要退出登陆？", e => {
            d.close();
            mana.unLogin();
        })
    }

}
