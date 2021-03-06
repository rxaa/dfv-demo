import * as React from 'dfv/src/public/dfvReact'

export const viewLayout = {

    title: "title",

    startTime: Date.now(),

    body: (content: HTMLElement | string, title?: string, head?: string) => {
        return (
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    <title>${title ? title : viewLayout.title}</title>
                    <link rel="stylesheet" href="/css/dfv.css" />
                    <script src="/js/promise.amd.min.js" ></script>${head ? head : ""}
                    <script>window.define=void 0</script>
                </head>
                <body>
                    ${content}
                </body>
            </html>`
        )
    },

    home: (content: HTMLElement) => {
        return viewLayout.body(content,
            viewLayout.title,
            `<script src="/js/home.js?v=${viewLayout.startTime}" ></script>`)
    },

    manage: (content: HTMLElement) => {
        return viewLayout.body(content,
            viewLayout.title,
            `<script src="/js/manage.js?v=${viewLayout.startTime}" ></script>`)
    },

    error: (msg: string) => {
        return viewLayout.body(
            <div class="pad20">
                <h1 class="back_red pad10">{msg}</h1>
                <h2 class="back_yellow pad10">
                    网络异常,请重新操作!
                </h2>
            </div>
            , viewLayout.title + ' - 网络异常')
    },


}