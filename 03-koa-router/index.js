const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

// 子路由-首页
let home = new Router()
home.get('/', async(ctx) => {
    let html = `
    <h1>首页</h1>
    <ul>
        <li><a href="/page/about">关于</a></li>
        <li><a href="/page/news">新闻</a></li>
    </ul>
    `
    ctx.body = html
})

// 子路由-page
let page = new Router()
news.get('/about', async(ctx) => {
    ctx.body = '关于我们'
}).get('/news', async(ctx) => {
    ctx.body = '新闻资讯'
})

// 装在所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 启动路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('starting........')
})