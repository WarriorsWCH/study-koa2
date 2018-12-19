const Koa = require('koa')
const logger = require('../middleware/logger')

const app = new Koa()

// 注意logger是函数，需要调用
app.use(logger())

app.use(async(ctx) => {
    ctx.body = 'hello koa2'
})
console.log(app)

app.listen(3000)
console.log('server is starting at port 3000')