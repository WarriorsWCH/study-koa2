const Koa = require('koa')
const app = new Koa()


app.use(async(ctx) => {

    if (ctx.url === '/' && ctx.method === 'GET') {

        // 当get请求时返回表单页面
        let html = `
            <h1>koa2 request post</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>nickName</p>
                <input name="nickName" /><br/>
                <p>email</p>
                <input name="email" /><br/>
                <button type="submit">submit</button>
            </form>
            `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {

        // 当POST请求时，解析POST
        let postData = await parsePostData(ctx)
        ctx.body = postData
    } else {

        // 其他请求显示404
        ctx.body = '<h1>404</h1>'
    }
})

app.listen(3000, () => {
    console.log('starting........')
})

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = ''

            // node接收post请求时，会以buffer的形式将数据缓存起来
            // koa2中通过ctx.req.addListener('data',...)这个方法监听这个buffer
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', function() {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将Post请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)

    // entries()是对键值对的遍历
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}