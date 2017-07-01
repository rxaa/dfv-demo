"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfv_1 = require("dfv");
dfv_1.dfvLib.init(__dirname);
const http = require("http");
const express = require("express");
const path = require("path");
const cfg = require("./config/config");
const mysqlModel_1 = require("./config/template/mysqlModel");
const Tasks_1 = require("./config/Tasks");
const html_1 = require("./config/template/html");
const RouteController_1 = require("./controllers/RouteController");
//定时任务
Tasks_1.Tasks.startAll();
if (cfg.isProduction) {
    dfv_1.dfvLog.enableConsole = false;
}
else {
    mysqlModel_1.mysqlModel.generate();
    html_1.ApiDoc.generate(true);
}
var app = express();
//日志 Config.enableHTML ? 'short' : 'combined'
// app.use(morgan('short', {
//     stream: {
//         write: function (str) {
//            // dfvLog.write(str, null, dfvLog.getCutFile("access.log"));
//         }
//     },
// }));
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.json());
// app.use(methodOverride());
//
// //启用压缩
// app.use(compression());
//
//启用cookie
// app.use(cookieParser("dsqikmnfhtlp"));
/**
 * 未处理的Promise Rejection
 */
process.on('unhandledRejection', function (error, promise) {
    dfv_1.dfvLog.write("unhandled Rejection:", error);
});
/**
 * 加载controllers
 */
dfv_1.route.load(app, [
    {
        menu: path.join(__dirname, 'controllers', 'web'),
        onRoute: RouteController_1.RouteController.onRoute(void 0, true),
    },
    {
        menu: path.join(__dirname, 'controllers', 'api'),
        onRoute: RouteController_1.RouteController.onRoute(RouteController_1.RouteController.loginCheckApi),
    },
]);
app.get("/user/test", (req, resp) => {
    resp.send("ok");
});
/**
 * 静态文件目录
 */
// app.use(express.static(path.join(__dirname, 'public')));
/**
 * 404
 */
app.use(function responser(req, resp, next) {
    resp.status(404);
    resp.end('404, Page Not Found!');
});
//错误处理
function errorHandler(err, req, res, next) {
    dfv_1.dfvLog.write(req.url + " " + req.ip + " errorHandler", err);
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