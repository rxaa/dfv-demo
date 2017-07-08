import assert = require('assert');
import {dfvHttpClient} from "dfv";
import {db} from "../models/db";


describe('router Test', function () {


    it('express route', async function () {
        let ht = new dfvHttpClient(`http://localhost:5000/api/test2`);
        let res = await ht.get();
        assert.equal(res.code, 200);
        assert.equal(res.content, `ok`);
        db.connecter.transaction(async ()=>{

        })
    });


});