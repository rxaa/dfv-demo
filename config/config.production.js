/**
 * 是否为正式环境
 * @type {boolean}
 */
exports.isProduction = true;

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
    sqlQueryLog: false,

    //查询结果日志
    // sqlQueryResultLog: true,

    //更新语句日志
    sqlUpdateLog: false,

    //慢查询时间（毫秒）
    sqlSlowLog: 500,

    //最大缓存数量
    maxCache: 10000,
}
