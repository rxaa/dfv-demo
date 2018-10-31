import { frontCfg } from "../../../config/frontCfg";
import { UploadRes } from "./SelectReq";
import { dfvFront } from "dfv/src/public/dfvFront";
import * as React from "dfv/src/public/dfvReact";
import { __React } from "dfv/src/reactExp";

export class RichText {
    editor: any;
    static hasLoad = false;

    constructor() {
        if (!RichText.hasLoad) {
            //加载js文件
            var script = document.createElement("script");
            script.async = false;  // 关闭异步加载，不是所有浏览都支持
            script.setAttribute('src', frontCfg.wangEditorPath);
            document.head!.appendChild(script);
            RichText.hasLoad = true;
        }
    }

    dom: HTMLDivElement;

    render(style: __React.HTMLAttributes = {}) {
        this.dom = <div {...style}>

        </div>
        this.initDiv(this.dom);
        return this.dom
    }

    initDiv(ele: string | HTMLDivElement) {

        var E = (window as any).wangEditor;

        if (E === undefined || !this.dom.parentElement) {
            //异步加载，需要多次尝试
            setTimeout(() => {
                this.initDiv(ele);
            }, 20);
            return;
        }

        this.editor = new E(ele);
        this.initEditor();
        this.editor.customConfig.onblur = () => {
            this.onBlur();
        }
        this.editor.create();

        this.onInit();
    }

    /**
     * 初始化成功回调（当异步加载js文件未完成时，setHtml getHtml以及addToolBarItem函数会调用失败）
     */
    onInit() {

    }

    setHtml(html: string) {
        this.editor.txt.html(html);
    }

    /**
     * 设置额外的上传图片属性额外
     * @param dat 
     */
    setUploadImgParas(dat: object) {
        this.editor.customConfig.uploadImgParams = dat;
    }

    getHtml(): string {
        return this.editor.txt.html()
    }

    onBlur() {

    }

    /**
     * 添加工具栏菜单按钮，必须在onInit回调里使用
     * @param ele 
     */
    addToolBarItem(ele: HTMLElement) {
        dfvFront.addEle(this.editor.$toolbarElem[0]
            , <div class="w-e-menu" style="z-index:10001;min-width:60px;">
                {ele}
            </div>);
    }

    static uploadHook(editor: RichText) {

    }


    private initEditor() {
        // 自定义菜单配置
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            //'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
        this.editor.customConfig.emotions = [
            {
                // tab 的标题
                title: '默认',
                // type -> 'emoji' / 'image'
                type: 'image',
                // content -> 数组
                content: [
                    {
                        alt: '[坏笑]',
                        src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
                    },
                    {
                        alt: '[舔屏]',
                        src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
                    },
                    {
                        alt: '[污]',
                        src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png'
                    },
                ]
            },
            {
                // tab 的标题
                title: 'emoji',
                // type -> 'emoji' / 'image'
                type: 'emoji',
                // content -> 数组
                content: ['🙂', '😏', '😀', '😃', '😄', '😁', '😆', '😘', '😍', '😭'
                    , '😜', '😡', '😥', '👍'
                    , '👌', '❤', '😱', '😎',]
            }
        ]
        this.editor.customConfig.uploadImgServer = frontCfg.apiUploadFile;
        this.editor.customConfig.uploadFileName = 'file'

        // this.editor.customConfig.customAlert = function (info) {
        //     // info 是需要提示的内容
        //     dfvFront.alertErr(info);
        // }


        this.editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result: UploadRes, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.url
                insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }

        RichText.uploadHook(this);
    }
}