
import { sql } from "dfv/src/public/sql";

export class dfv_file {


    /**
     * 
     */
    @sql.primaryKey
    @sql.autoIncrement
    @sql.cacheId
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

    /**
     * 文件大小字节
     */
    size = 0;

    uid = 0;

}