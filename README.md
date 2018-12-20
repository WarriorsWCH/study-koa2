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
        setTimeout(() => 
            resolve("long_time_value")
        , 1000); 
    });
}
async function test() {
    const v = await findData(); 
    console.log(v);
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

### 五、koa 中间件

#### 1、什么是 Koa 的中间件

通俗的讲:中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以
把它叫做中间件。

在express中间件(Middleware)是一个函数，它可以访问请求对象(request object (req)), 响应对象(response object (res)), 和 web 应用中处理请求-响应循环流程中的中间件，一 般被命名为 next 的变量。在 Koa 中中间件和 express 有点类似。

中间件的功能包括:
- 执行任何代码。 
- 修改请求和响应对象。 
- 终结请求-响应循环。 
- 调用堆栈中的下一个中间件。

如果我的 get、post 回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹 配了。如果想往下匹配的话，那么需要写 next()

#### 2、Koa 应用可使用如下几种中间件

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 第三方中间件

**应用级中间件**
```
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router(); 
app.use(async (ctx,next)=>{
    console.log(new Date());
    await next();
})
router.get('/', function (ctx, next) { 
    ctx.body="Hello koa";
}) 
router.get('/news',(ctx,next)=>{
    ctx.body="新闻页面" 
});
app.use(router.routes()); //作用:启动路由 app.use(router.allowedMethods()); //作用: 当请求出错时的处理逻辑 app.listen(3000,()=>{
    console.log('starting at port 3000'); 
});
```
**路由中间件**
```
router.get('/', async(ctx, next)=>{ 
    console.log(1)
    next() 
})
router.get('/', function (ctx) { 
    ctx.body="Hello koa";
})
```

**错误处理中间件**
```
app.use(async (ctx,next)=> { 
    next();
    if(ctx.status==404){ 
        ctx.status = 404; 
        ctx.body="这是一个 404 页面"
    } 
});
```

**第三方中间件**
```
const static = require('koa-static'); 
const staticPath = './static'; 
app.use(static(path.join( __dirname, staticPath) ))
const bodyParser = require('koa-bodyparser'); 
app.use(bodyParser());
```

### 六、cookie

#### 1、Cookie 简介 

- cookie是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。
- HTTP 是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页 面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何 关系的。

#### 2、Koa Cookie 的使用

Koa 中设置 Cookie 的值： ctx.cookies.set(name, value, [options])

通过 options 设置 cookie name 的 value :
- **maxAge** ---- 一个数字表示从 Date.now() 得到的毫秒数
- **expires** ---- cookie 过期的 Date
- **path** ---- cookie 路径, 默认是'/'
- **domain** ---- cookie 域名
- **secure** ---- 安全 cookie 默认 false，设置成 true 表示 只有 https 可以访问
- **httpOnly** ---- 是否只是服务器可访问 cookie, 默认是true
- **overwrite** ---- 一个布尔值，表示是否覆盖以前设置的同名 的 cookie (默认是 false). 如果是 true, 在同 一个请求中设置相同名称的所有 Cookie(不 管路径或域)是否在设置此 Cookie 时从 Set-Cookie 标头中过滤掉。

Koa 中获取 Cookie 的值：ctx.cookies.get('name');

#### 3、Koa 中设置中文 Cookie
```
console.log(new Buffer('hello, world!').toString('base64'));
// 转换成 base64 字符 串:aGVsbG8sIHdvcmxkIQ==
console.log(new Buffer('aGVsbG8sIHdvcmxkIQ==', 'base64').toString());
// 还原 base 64 字符串:hello, world!
```

### 七、Session

#### 1、Session 简单介绍
session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上。

#### 2、Session 的工作流程
session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上。
当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生 成一个类似于 key,value 的键值对， 然后将 key(cookie)返回到浏览器(客户)端，浏览 器下次再访问时，携带 key(cookie)，找到对应的 session(value)。 客户的信息都保存 在 session 中


#### 3、koa-session 的使用: 
- 安装 express-session
```
  npm install koa-session --save
```
- 引入 express-session
```
 const session = require('koa-session');
```
- 设置官方文档提供的中间件
```
app.keys = ['some secret hurr']; 
const CONFIG = {
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days) overwrite: true, //是否可以 overwrite (默认 default true)
    httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true) signed: true, //签名默认 true
    rolling:false, //在每次请求时强行设置cookie，这将重置cookie过期时间(默认:false) renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
```
- 使用
```
设置值 ctx.session.username = "张三"; 
获取值 ctx.session.username
```
#### 4、Cookie 和 Session 区别 
- 1、cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
- 2、cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗 考虑到安全应当使用 session。
- 3、session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用 COOKIE。
- 4、单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。