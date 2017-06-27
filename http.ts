import {dfvLib, dfvLog, route} from "dfv";
dfvLib.init(__dirname);

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

var app = express();

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//日志 Config.enableHTML ? 'short' : 'combined'
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

// app.use(app.router);

/**
 * 未处理的Promise Rejection
 */
process.on('unhandledRejection', function (error, promise) {
    dfvLog.write("unhandled Rejection:", error);
});

route.load(app, [{
    menu: path.join(__dirname, 'controllers', 'web'),
    onRoute: async (dat) => {
        try {
            if (!dat.valid.ok) {
                //验证失败
                dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid));
                dat.ctx.status = 500;
                dat.ctx.body = dat.valid.msg;
                return;
            }

            let ret = await dat.router.next(dat);
            if (ret != null)
                dat.ctx.body = ret;
        } catch (e) {
            dfvLog.write(dat.router.url + " : " + JSON.stringify(dat.valid), e)
            dat.ctx.status = 500;
            dat.ctx.body = "网络异常";
        }
    }
}]);


app.use(express.static(path.join(__dirname, 'public')));


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

http.createServer(app).listen(5000, () => {
    console.log('express server listening on port 5000');
}).on('connection', function (socket: net.Socket) {
    //console.log("A new connection was made by a client.");
    socket.setTimeout(5 * 60 * 1000);
});

//启动https服务
// var options = {
//     key: fs.readFileSync(__dirname + '/configExt/keys/server.key'),
//     cert: fs.readFileSync(__dirname + '/configExt/keys/server.crt'),
//     ca: fs.readFileSync(__dirname + '/configExt/keys/1_root_bundle.crt'),
// };
//
// https.createServer(options, app).listen(Config.rpcServer.portHttps, function () {
//     console.log('Express server HTTPS listening on port ' + Config.rpcServer.portHttps);
// }).on('connection', function (socket: net.Socket) {
//     //console.log("A new connection was made by a client.");
//     socket.setTimeout(10 * 60 * 1000);
// });