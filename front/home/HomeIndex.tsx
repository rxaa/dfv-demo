import * as React from "dfv/src/public/dfvReact";
import { RichText } from "../common/temp/RichText"

export class HomeIndex {

    editor = new RichText();

    constructor() {
        this.editor.onInit = () => {
            this.editor.addToolBarItem(<a href="###" >全屏</a>);
            this.editor.setHtml("初始化测试");
        }
    }

    render() {
        return <div>
            富文本测试：
            {
                this.editor.render({
                    style: {
                        width: "100%"
                    }
                })
            }
        </div>
    }
}