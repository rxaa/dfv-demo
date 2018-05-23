"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const dfv_1 = require("dfv/src/public/dfv");
const dfvFront_1 = require("dfv/src/public/dfvFront");
class TempRichTextEdit {
    /**
     *
     * @param validEdit  验证函数
     */
    constructor(validEdit) {
        this.validEdit = validEdit;
        this.id = "";
        if (!TempRichTextEdit.hasLoad) {
            var script = document.createElement("script");
            //script.async = false;  // 这里
            script.setAttribute('src', "/js/wangEditor.min.js");
            document.body.appendChild(script);
            TempRichTextEdit.hasLoad = true;
        }
    }
    onShow(e) {
        this.id = dfv_1.dfv.getUniqueId16();
        if (e.isEditAll) {
            e.dom =
                React.createElement("div", { class: "flex-row y-center" },
                    this.text =
                        React.createElement("div", { id: this.id, style: { width: "100%" } }),
                    this.info = React.createElement("span", { class: "red" }));
        }
        else {
            e.dom =
                React.createElement("div", { class: "flex-col y-center" },
                    this.text =
                        React.createElement("div", { id: this.id, style: { width: "100%", overflow: "hidden" } }),
                    this.info = React.createElement("span", { class: "red" }));
            setTimeout(() => {
                //this.text.focus();
            }, 0);
        }
        var E = window.wangEditor;
        this.editor = new E(this.text);
        this.initEditor();
        this.editor.customConfig.onblur = () => {
            this.onValid(e);
        };
        this.editor.create();
        dfvFront_1.dfvFront.addEle(this.editor.$toolbarElem[0], React.createElement("div", { class: "w-e-menu", style: "z-index:10001;min-width:60px;" }, this.fullScreenA =
            React.createElement("a", { onclick: e => this.toggleFullscreen(), href: "###" }, "\u5168\u5C4F")));
        this.editor.txt.html(e.funcValue);
    }
    toggleFullscreen() {
        if (this.fullScreenA.innerHTML == "全屏") {
            this.fullScreenA.innerHTML = "退出全屏";
            this.text.className += " fullscreen-editor";
        }
        else {
            this.fullScreenA.innerHTML = "全屏";
            dfvFront_1.dfvFront.classRemove(this.text, "fullscreen-editor");
        }
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
        this.editor.customConfig.uploadImgServer = '/file/upload';
        this.editor.customConfig.uploadFileName = 'file';
        this.editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
            dfvFront_1.dfvFront.alertErr(info);
        };
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
        TempRichTextEdit.uploadHook(this.editor);
    }
    onValid(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validEdit)
                    e.dat[e.field] = yield this.validEdit(this.editor.txt.html(), e.dat);
                else
                    e.dat[e.field] = this.editor.txt.html();
                this.info.innerHTML = "";
            }
            catch (err) {
                this.info.innerHTML = err.message;
                return false;
            }
            return true;
        });
    }
}
TempRichTextEdit.hasLoad = false;
exports.TempRichTextEdit = TempRichTextEdit;
//# sourceMappingURL=TempRichTextEdit.js.map