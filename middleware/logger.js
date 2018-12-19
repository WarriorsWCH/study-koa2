// async中间件开发
function log(ctx) {
    console.log('logger:' + ctx.method + ' -> ' + ctx.header.host + ctx.url)
}

module.exports = function() {
    return async function(ctx, next) {
        log(ctx)
            // 调用next函数
        await next()
    }
}