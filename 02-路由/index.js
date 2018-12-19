const Koa = require('koa')

const app = new Koa()

function route(url) {
    console.log('route:' + url)
    let html = '<h1>404</h1>'
    switch (url) {
        case '/':
            html = `
            <h1>首页</h1>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/news">新闻</a></li>
                <li><a href="/about">关于</a></li>
            </ul>`
            break
        case '/news':
            html = `
            <h1>新闻</h1>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/news">新闻</a></li>
                <li><a href="/about">关于</a></li>
            </ul>`
            break
        case '/about':
            html = `
            <h1>关于</h1>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/news">新闻</a></li>
                <li><a href="/about">关于</a></li>
            </ul>`
            break
        default:
            break
    }
    return html
}

app.use(async(ctx) => {
    // http://localhost:3000/detail/123
    let url = ctx.request.url

    let html = route(url)
    console.log(html)

    ctx.body = html

    // 上下文请求request中的url就是当前访问的路径名称，可以根据ctx.request.url通过一定的判断
    // 或者正则匹配就可以定制出所需的路由
})

app.listen(3000)