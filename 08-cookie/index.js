const Koa = require('koa')
const app = new Koa()

// koa提供了从上下文直接获取、写入cookie的方法
// ctx.cookies.get(name, ...)读取上下文请求中的cookie
// ctx.cookies.set(name,value,....)在上下文中写入cookie
app.use(async(ctx) => {

    if (ctx.url === '/index') {
        ctx.cookies.set(
            'cid',
            'koa cookies', {
                domain: 'localhost', // 写cookie所在的域名
                path: '/index', // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                expires: new Date('2018-12-20'), // cookie失效时间
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false, // 是否允许重写
            }
        )
        ctx.body = 'koa cokkies'
    } else {
        ctx.body = 'hellooooooooo'
    }
})

app.listen(3000, () => {
    console.log('starting.......')
})