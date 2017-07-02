module.exports = {
    apps: [
        {
            //应用名
            name: "app",
            //入口文件
            script: "http.js",
            //启动参数
            args: "production",

            watch: false,
            "cwd": __dirname,
            merge_logs: true,
            "out_file": __dirname + "/runtime/logs/out.log",
            "error_file": __dirname + "/runtime/logs/error.log",
            "pid_file": __dirname + "/runtime/logs/app.pid",
            "log_date_format": "YYYY-MM-DD HH:mm:ss ",

            //进程数目
            // instances: 4,
            // exec_mode: "cluster",
        }
    ]
}