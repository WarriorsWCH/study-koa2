### 一、Koa 框架介绍

Node.js 是一个异步的世界，官方 API 支持的都是 callback 形式的异步编程模型，这会带来许多问题，例如:
- 1、callback 嵌套问题 
- 2、异步函数中可能同步调用 callback 返回数据，带来不一致性。
为了解决以上问题 Koa 出现了。

Koa -- 基于 Node.js 平台的下一代 web 开发框架

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。 使用 koa 编写 web 应用，可以免除重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。开发思路和 express 差不多，最大的特点就是可以避免异步嵌套。

### 二、Koa2.x 框架的安装使用

#### 1、安装 Node.js 8.x 以上的版本

开发 Koa2 之前，Node.js 是有要求的，它要求 Node.js 版本高于 V7.6。因为 node.js 7.6 版本 开始完全支持 async/await，所以才能完全你支持我们的 Koa2。

nvm管理多版本node.js：可以用nvm 进行node版本进行管理
- Mac系统安装nvm https://github.com/creationix/nvm#manual-install
- windows系统安装nvm https://github.com/coreybutler/nvm-windows
- Ubuntu系统安装nvm https://github.com/creationix/nvm

#### 2、安装 Koa

npm install --save koa
--save 参数，表示自动修改 package.json 文件，自动添加依赖项。

### 三、async/await使用

```
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 500)
    } catch ( err ) {
      reject( err )
    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime = ${time}`
  return data
}

async function getData() {
  let data = await getSyncData()
  console.log( data )
}

getData()

```
从上述例子可以看出 async/await 的特点：

- 可以让异步逻辑用同步写法实现
- 最底层的await返回需要是Promise对象
- 可以通过多层 async function 的同步写法代替传统的callback嵌套

async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

简单理解:

- async 是让方法变成异步。
- await 是等待异步方法执行完成。

await 在等待 async 方法执行完毕，其实 await 等待的只是一个表达式，这个表达式在官方 文档里说的是 Promise 对象，但是它也可以接受普通值。 注意:await 必须在 async 方法中 才可以使用因为 await 访问本身就会造成程序停止堵塞，所以必须在异步方法中才可以使用。

async/await 同时使用
async 会将其后的函数(函数表达式或 Lambda)的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。
```
function findData() {
    return new Promise(resolve => {
    setTimeout(() => resolve("long_time_value"), 1000); });
}
async function test() {
    const v = await findData(); console.log(v);
} 
test();
```
### 四、Koa 路由

路由(Routing)是由一个 URI(或者叫路径)和一个特定的 HTTP 方法(GET、POST 等)
组成的，涉及到应用如何响应客户端对某个网站节点的访问。

通俗的讲:路由就是根据不同的 URL 地址，加载不同的页面实现不同的功能。
Koa 中的路由和 Express 有所不同，在 Express 中直接引入 Express 就可以配置路由，但是在 Koa 中我们需要安装对应的 koa-router 路由模块来实现。 npm install --save koa-router

```
const Koa = require('koa');
const router = require('koa-router')(); //注意:引入的方式 const app = new Koa();
router.get('/', function (ctx, next) {
    ctx.body="Hello koa";
})
router.get('/news,(ctx,next)=>{ 
    ctx.body="新闻 page"
});
app.use(router.routes()); //作用:启动路由 
app.use(router.allowedMethods()); // 作用: 这是官方文档的推荐用法,我们可以 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
app.listen(3000,()=>{
    console.log('starting at port 3000'); 
});
```

**Koa 动态路由**
```
var Koa=require('koa');

var router = require('koa-router')();  /*引入是实例化路由** 推荐*/

//实例化
var app=new Koa();

router.get('/',async (ctx)=>{
    ctx.body="首页";

})

router.get('/news',async (ctx)=>{
    ctx.body="新闻列表页面";

})
//动态路由  http://localhost:3002/newscontent/xxxx
router.get('/newscontent/:aid',async (ctx)=>{

    //获取动态路由的传值

    console.log(ctx.params);  //{ aid: '456' }

    ctx.body="新闻详情";

})
//动态路由里面可以传入多个值

//http://localhost:3002/package/123/456

router.get('/package/:aid/:cid',async (ctx)=>{

    //获取动态路由的传值

    console.log(ctx.params);  //{ aid: '123', cid: '456' }

    ctx.body="新闻详情";

})


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app.listen(3000);
```