import {valid} from "dfv/src/public/valid";
export class TestReq1 {
    /**
     * id
     */
    id = 1;

    /**
     * name
     */
    name = "";

    /**
     * val
     * @type {number}
     */
    @valid.int(r => r.val > 2, "val必须大于2")
    val = 0;


    obj = new TestReq2();
}

export class TestReq2 {
    /**
     * id
     */
    id = 1;

    /**
     * name
     */
    name = "";

    /**
     * val
     * @type {number}
     */
    @valid.int(r => r.val > 2, "val必须大于2")
    val = 0;
}