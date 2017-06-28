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
const dfv_1 = require("dfv");
dfv_1.dfvLib.init(__dirname);
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
if (!cfg.isProduction) {
    mysqlModel_1.mysqlModel.generate();
}
var app = express();
//日志 Config.enableHTML ? 'short' : 'combined'
app.use(morgan('short', {
    stream: {
        write: function (str) {
            dfv_1.dfvLog.write(str, null, dfv_1.dfvLog.getCutFile("access.log"));
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
// app.use(app.router);
/**
 * 未处理的Promise Rejection
 */
process.on('unhandledRejection', function (error, promise) {
    dfv_1.dfvLog.write("unhandled Rejection:", error);
});
/**
 * 加载controllers
 */
dfv_1.route.load(app, [{
        menu: path.join(__dirname, 'controllers', 'web'),
        onRoute: (dat) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!dat.valid.ok) {
                    //验证失败
                    dfv_1.dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid));
                    dat.ctx.status = 500;
                    dat.ctx.body = dat.valid.msg;
                    return;
                }
                let ret = yield dat.router.next(dat);
                if (ret != null)
                    dat.ctx.body = ret;
            }
            catch (e) {
                dfv_1.dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid), e);
                dat.ctx.status = 500;
                dat.ctx.body = "网络异常";
            }
        })
    }]);
/**
 * 静态文件目录
 */
app.use(express.static(path.join(__dirname, 'public')));
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
//     key: fs.readFileSync(__dirname + '/configExt/keys/server.key'),
//     cert: fs.readFileSync(__dirname + '/configExt/keys/server.pem'),
// };
//
// https.createServer(options, app).listen(Config.rpcServer.portHttps, function () {
//     console.log('Express server HTTPS listening on port ' + Config.rpcServer.portHttps);
// }).on('connection', function (socket: net.Socket) {
//     //console.log("A new connection was made by a client.");
//     socket.setTimeout(10 * 60 * 1000);
// }); 
//# sourceMappingURL=http.js.map