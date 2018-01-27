"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const dfv_1 = require("dfv");
let a = class {
    constructor() {
        this.a = 2;
        this.b = 3;
    }
};
let c = new a();
describe('router Test', function () {
    it('express route', async function () {
        let ht = new dfv_1.dfvHttpClient(`http://localhost:5000/api/test2`);
        let res = await ht.get();
        assert.equal(res.code, 200);
        assert.equal(res.content, `ok`);
    });
});
//# sourceMappingURL=testRouter.js.map