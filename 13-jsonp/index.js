const Koa = require('koa')
const app = new Koa()
const jsonp = require('koa-jsonp')

app.use(jsonp())

app.use(async(ctx) => {
    let returnData = {
        success: true,
        data: {
            text: 'this is a jsonp api',
            time: new Date().getTime(),
        }
    }

    // 直接输出JSON
    ctx.body = returnData
})

// app.use(async(ctx) => {

//     // 如果jsonp的请求为GET
//     if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {

//         // 获取jsonp的callback
//         let callbackName = ctx.query.callback || 'callback'
//         let returnData = {
//             success: true,
//             data: {
//                 text: 'this is a jsonp api',
//                 time: new Date().getTime(),
//             }
//         }

//         // jsonp的script字符串
//         let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

//         // 用text/javascript，让请求支持跨域获取
//         ctx.type = 'text/javascript'

//         // 输出jsonp字符串
//         ctx.body = jsonpStr
//     } else {
//         ctx.body = 'HELLO JSONP'
//     }

// })

app.listen(3000)