import assert = require('assert');
import {dfvHttpClient} from "dfv";
import {StringDecoder} from "string_decoder";

let a = class {
    a = 2;
    b = 3;
}

let c = new a();

describe('router Test', function () {

    it('express route', async function () {
        let ht = new dfvHttpClient(`http://localhost:5000/api/test2`);
        let res = await ht.get();
        assert.equal(res.code, 200);
        assert.equal(res.content, `ok`);

    });


});