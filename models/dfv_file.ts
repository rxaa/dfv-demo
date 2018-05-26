
import { sql } from "dfv/src/public/sql";

export class dfv_file {


    /**
     * 
     */
    @sql.primaryKey
    @sql.autoIncrement
    fid: number = 0;

    /**
     * 
     */
    url: string = "";

    /**
     * 
     */
    add_date: number = 0;

    /**
     * 
     */
    md5: string = "";

    /**
     * 
     */
    name: string = "";

    uid = 0;

}