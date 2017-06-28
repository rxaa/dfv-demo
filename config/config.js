//通过启动参数，判断是否正式环境
if (process.argv[1] === "production") {
    exports = require("./config.production");
}
else {
    /**
     * 是否为正式环境
     * @type {boolean}
     */
    exports.isProduction = false;

    /**
     * http启动端口
     * @type {number}
     */
    exports.httpPort = 5000;

    /**
     * mysql配置文件
     * @type {IPoolConfig & MysqlConfig}
     */
    exports.mysql = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'blog',
        port: 3306,

        //错误日志
        sqlErrorLog: true,

        //查询语句日志
        sqlQueryLog: true,

        //查询结果日志
        // sqlQueryResultLog: true,

        //更新语句日志
        sqlUpdateLog: true,

        //慢查询时间（毫秒）
        sqlSlowLog: 1000,

        //最大缓存数量
        maxCache: 10000,
    }
}

