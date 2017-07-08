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
const assert = require("assert");
const dfv_1 = require("dfv");
const db_1 = require("../models/db");
describe('router Test', function () {
    it('express route', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let ht = new dfv_1.dfvHttpClient(`http://localhost:5000/api/test2`);
            let res = yield ht.get();
            assert.equal(res.code, 200);
            assert.equal(res.content, `ok`);
            db_1.db.connecter.transaction(() => __awaiter(this, void 0, void 0, function* () {
            }));
        });
    });
});
//# sourceMappingURL=testRouter.js.map