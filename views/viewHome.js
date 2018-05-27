"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("dfv/src/public/dfvReact");
const viewLayout_1 = require("./viewLayout");
const HomeIndex_1 = require("../front/home/HomeIndex");
const dfvFront_1 = require("dfv/src/public/dfvFront");
const mana_1 = require("../front/manage/mana");
exports.viewHome = {
    index: () => viewLayout_1.viewLayout.home(React.createElement("script", null, () => {
        dfvFront_1.dfvFront.setBody(new HomeIndex_1.HomeIndex().render());
    })),
    manage: () => viewLayout_1.viewLayout.manage(React.createElement("script", null, () => {
        mana_1.mana.init();
    })),
};
//# sourceMappingURL=viewHome.js.map