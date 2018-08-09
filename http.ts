import { dfvLib } from "dfv";
dfvLib.init(__dirname);

import { dfvLog, route } from "dfv";
import * as https from 'https';
import * as http from 'http';
import * as net from "net";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as  methodOverride from 'method-override';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as path from "path";
import * as cfg from "./config/config";
import { mysqlModel } from "./config/template/mysqlModel";
import { Tasks } from "./config/Tasks";
import { ApiDoc } from "./config/template/html";
import { RouteController } from "./controllers/RouteController";


//定时任务
Tasks.startAll();

if (cfg.isProduction) {
    dfvLog.enableConsole = false;
}
else {
    /**
     * 生成mysql model至/runtime/models
     */
    mysqlModel.generate();
    /**
     * 生成接口文件至/runtime/template
     */
    ApiDoc.generate(true);
}


var app = express();

app.disable('x-powered-by');

//日志 cfg.isProduction ? 'short' : 'combined'
app.use(morgan('short', {
    stream: {
        write: function (str) {
            dfvLog.write(str, null, dfvLog.getCutFile("access.log"));
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
    dfvLog.write("unhandled Rejection:", error);
});


/**
 * 加载controllers
 */
route.load(app, [
    {
        menu: path.join(__dirname, 'controllers', 'web'),
        onRoute: RouteController.onRoute(void 0, true),
    },
    {
        menu: path.join(__dirname, 'controllers', 'api'),
        onRoute: RouteController.onRoute(RouteController.loginCheckApi),
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
app.use(function responser(req: express.Request, resp: express.Response, next: () => void) {
    resp.status(404);
    resp.end('404, Page Not Found!');
});


//错误处理
function errorHandler(err, req: express.Request, res: express.Response, next: Function): any {
    dfvLog.write(req.url + " " + req.ip + " errorHandler", err);
    res.status(500);
    res.end("网络异常");
}
app.use(errorHandler);

http.createServer(app).listen(cfg.httpPort, () => {
    console.log('express server listening on port ' + cfg.httpPort);
}).on('connection', function (socket: net.Socket) {
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