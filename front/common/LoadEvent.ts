import { dfv, MapString } from "dfv/src/public/dfv";
import { dfvFront } from "dfv/src/public/dfvFront";


export class LoadEvent {
    type: number = LoadEvent.funcEvent;
    dat: string = "";

    static invalid = 0;
    static funcEvent = 1;
    static loadBodyEvent = 2;

    /**
     * funcEvent事件的函数
     */
    static funcMap: MapString<() => void> = {};


    /**
     * LoadEvent事件处理函数
     */
    static procArr: Array<(dat: LoadEvent) => void> = [];

    /**
     * 是由前进,后退按钮触发
     */
    isPopState: boolean;

    constructor(dat: string, type: number) {
        this.dat = dat;
        this.type = type;
    }


    /**
     * push设置新页面
     * @param func
     * @param url
     */
    static pushFunc(func: () => void, url?: string) {

        //修复初始时空state
        if (window.history.state == null) {
            LoadEvent.replaceFunc(func);
            return;
        }

        if (url == null) {
            url = "#" + dfv.getUniqueId16();
        }

        try {
            func();
            if (url && window.history.pushState)
                window.history.pushState(LoadEvent.func(func), "", url);
        } catch (e) {
            dfvFront.onCatchError(e);
        }
    }


    static func(func: () => void) {
        let id = dfv.getUniqueId16();
        LoadEvent.funcMap[id] = func;
        return new LoadEvent(id, LoadEvent.funcEvent);
    }

    static newBody(dat: string) {
        return new LoadEvent(dat, LoadEvent.loadBodyEvent);
    }

    static procLoadEvent(dat: LoadEvent) {
        if (dat.type > LoadEvent.invalid && dat.type < LoadEvent.procArr.length) {
            LoadEvent.procArr[dat.type](dat);
        }
    }


    private static replaceFunc(func: () => void) {
        try {
            func();
            if (window.history.replaceState)
                window.history.replaceState(LoadEvent.func(func), "");
        } catch (e) {
            dfvFront.onCatchError(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.onpopstate = ev => {
        if (ev.state) {
            (ev.state as LoadEvent).isPopState = true
            LoadEvent.procLoadEvent(ev.state as LoadEvent)
        }
    }

    LoadEvent.procArr[LoadEvent.funcEvent] = d => {
        try {
            let func = LoadEvent.funcMap[d.dat];
            if (func)
                func();
        } catch (e) {
            dfvFront.onCatchError(e)
        }
    }

    LoadEvent.procArr[LoadEvent.loadBodyEvent] = d => {
        window.document.body.innerHTML = "";
        dfvFront.addEle(window.document.body, d.dat)
        if (!d.isPopState)
            dfvFront.scrollToTop();
    }

}


