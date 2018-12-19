const Koa = require('koa')
const app = new Koa()

// 在koa中，获取GET请求数据源头是koa中request对象中的query或querystring，
// query返回的是格式化好的参数对象，querystring返回的是请求字符串
// 由于xtc对request的API有直接引用的方式，所以获取GET请求参数有两种途径
app.use(async(ctx) => {

    // 从上下文中直接获取
    let url = ctx.url
    let query = ctx.query
    let querystring = ctx.querystring

    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = ctx.request.query
    let req_querystring = ctx.request.querystring

    ctx.body = {
        url,
        query,
        querystring,
        request,
        req_query,
        req_querystring
    }

})

// http://localhost:3000/abc/123?name=tom
app.listen(3000, () => {
    console.log('starting........')
})