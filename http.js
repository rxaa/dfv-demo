"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
dfv_1.dfvLib.init(__dirname);
const dfv_2 = require("dfv");
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
const cfg = require("./config/config");
const mysqlModel_1 = require("./config/template/mysqlModel");
const Tasks_1 = require("./config/Tasks");
const html_1 = require("./config/template/html");
const RouteController_1 = require("./controllers/RouteController");
//定时任务
Tasks_1.Tasks.startAll();
if (cfg.isProduction) {
    dfv_2.dfvLog.enableConsole = false;
}
else {
    /**
     * 生成mysql model至/runtime/models
     */
    mysqlModel_1.mysqlModel.generate();
    /**
     * 生成接口文件至/runtime/template
     */
    html_1.ApiDoc.generate(true);
}
var app = express();
app.disable('x-powered-by');
//日志 cfg.isProduction ? 'short' : 'combined'
app.use(morgan('short', {
    stream: {
        write: function (str) {
            dfv_2.dfvLog.write(str, null, dfv_2.dfvLog.getCutFile("access.log"));
        }
    },
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
//启用压缩
app.use(compression());
//
//启用cookie
app.use(cookieParser("dsqikmnfhtlp"));
/**
 * 未处理的Promise Rejection
 */
process.on('unhandledRejection', function (error, promise) {
    dfv_2.dfvLog.write("unhandled Rejection:", error);
});
/**
 * 加载controllers
 */
dfv_2.route.load(app, [
    {
        menu: path.join(__dirname, 'controllers', 'web'),
        onRoute: RouteController_1.RouteController.onRoute(void 0, true),
    },
    {
        menu: path.join(__dirname, 'controllers', 'api'),
        onRoute: RouteController_1.RouteController.onRoute(RouteController_1.RouteController.loginCheckApi),
    },
]);
/**
 * 静态文件目录
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 上传文件路径
 */
app.use(express.static(path.join(__dirname, 'runtime/file')));
if (!cfg.isProduction) {
    //用于调试
    app.use(express.static(path.join(__dirname, '/../')));
}
/**
 * 404
 */
app.use(function responser(req, resp, next) {
    resp.status(404);
    resp.end('404, Page Not Found!');
});
//错误处理
function errorHandler(err, req, res, next) {
    dfv_2.dfvLog.write(req.url + " " + req.ip + " errorHandler", err);
    res.status(500);
    res.end("网络异常");
}
app.use(errorHandler);
http.createServer(app).listen(cfg.httpPort, () => {
    console.log('express server listening on port ' + cfg.httpPort);
}).on('connection', function (socket) {
    //console.log("A new connection was made by a client.");
    socket.setTimeout(5 * 60 * 1000);
});
//启动https服务
// var options:https.ServerOptions = {
//     key: fs.readFileSync(__dirname + '/config/keys/server.key'),
//     cert: fs.readFileSync(__dirname + '/config/keys/server.pem'),
// };
//
// https.createServer(options, app).listen(Config.rpcServer.portHttps, function () {
//     console.log('Express server HTTPS listening on port ' + Config.rpcServer.portHttps);
// }).on('connection', function (socket: net.Socket) {
//     //console.log("A new connection was made by a client.");
//     socket.setTimeout(10 * 60 * 1000);
// });
//# sourceMappingURL=http.js.map