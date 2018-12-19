const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(async(ctx) => {
    let title = 'HELLO KOA'
    await ctx.render('index', {
        title
    })
})

app.listen(3000)