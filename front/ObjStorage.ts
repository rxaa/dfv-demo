import {dfv} from "dfv/src/public/dfv";

/**
 * 储存对象至localStorage
 */
export class ObjStorage<T> {
    private _dat: T | undefined | null;
    static _count = 0;

    get dat(): T {
        if (this._dat == null) {
            this.read();
        }

        return this._dat!;
    }

    set dat(dat: T) {
        this._dat = dat;
    }

    save() {
        if (this._dat != null)
            localStorage[this._key] = JSON.stringify(this._dat);
    }


    read() {
        let local = localStorage[this._key];
        if (local) {
            this._dat = JSON.parse(local);
            dfv.setPrototypeOf(this._dat, this.clas);
        }
        else {
            this._dat = new this.clas();
        }
    }

    private _key: string;

    constructor(private clas: { new (): T }) {
        this._key = dfv.getFuncName(this.clas) + "_ObjStorage";
    }


}