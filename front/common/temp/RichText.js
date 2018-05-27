"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontCfg_1 = require("../../../config/frontCfg");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const React = require("dfv/src/public/dfvReact");
class RichText {
    constructor() {
        if (!RichText.hasLoad) {
            //加载js文件
            var script = document.createElement("script");
            script.async = false; // 关闭异步加载，不是所有浏览都支持
            script.setAttribute('src', frontCfg_1.frontCfg.wangEditorPath);
            document.head.appendChild(script);
            RichText.hasLoad = true;
        }
    }
    render(style = {}) {
        this.dom = React.createElement("div", Object.assign({}, style));
        this.initDiv(this.dom);
        return this.dom;
    }
    initDiv(ele) {
        var E = window.wangEditor;
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
        };
        this.editor.create();
        this.onInit();
    }
    /**
     * 初始化成功回调（当异步加载js文件未完成时，setHtml getHtml以及addToolBarItem函数会调用失败）
     */
    onInit() {
    }
    setHtml(html) {
        this.editor.txt.html(html);
    }
    /**
     * 设置额外的上传图片属性额外
     * @param dat
     */
    setUploadImgParas(dat) {
        this.editor.customConfig.uploadImgParams = dat;
    }
    getHtml() {
        return this.editor.txt.html();
    }
    onBlur() {
    }
    /**
     * 添加工具栏菜单按钮，必须在onInit回调里使用
     * @param ele
     */
    addToolBarItem(ele) {
        dfvFront_1.dfvFront.addEle(this.editor.$toolbarElem[0], React.createElement("div", { class: "w-e-menu", style: "z-index:10001;min-width:60px;" }, ele));
    }
    static uploadHook(editor) {
    }
    initEditor() {
        // 自定义菜单配置
        this.editor.customConfig.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'foreColor',
            'backColor',
            'link',
            //'list',  // 列表
            'justify',
            'quote',
            'emoticon',
            'image',
            'table',
            'video',
            'code',
            'undo',
            'redo' // 重复
        ];
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
                content: ['🙂', '😏', '😀', '😃', '😄', '😁', '😆', '😘', '😍', '😭',
                    '😜', '😡', '😥', '👍',
                    '👌', '❤', '😱', '😎',]
            }
        ];
        this.editor.customConfig.uploadImgServer = frontCfg_1.frontCfg.apiUploadFile;
        this.editor.customConfig.uploadFileName = 'file';
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
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.url;
                insertImg(url);
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        };
        RichText.uploadHook(this);
    }
}
RichText.hasLoad = false;
exports.RichText = RichText;
//# sourceMappingURL=RichText.js.map