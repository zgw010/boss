开启 mongodb 步骤：
1. sudo service mongod start
2. mongod
3. mongo

## get和post的区别

|                  | GET                                                          | POST                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 后退按钮/刷新    | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）。     |
| 书签             | 可收藏为书签                                                 | 不可收藏为书签                                               |
| 缓存             | 能被缓存                                                     | 不能缓存                                                     |
| 编码类型         | application/x-www-form-urlencoded                            | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史             | 参数保留在浏览器历史中。                                     | 参数不会保存在浏览器历史中。                                 |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。 | 无限制。                                                     |
| 对数据类型的限制 | 只允许 ASCII 字符。                                          | 没有限制。也允许二进制数据。                                 |
| 安全性           | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。 |
| 可见性           | 数据在 URL 中对所有人都是可见的。                            | 数据不会显示在 URL 中。                                      |

GET的语义是请求获取指定的资源。GET方法是安全、幂等、可缓存的（除非有 Cache-ControlHeader的约束）,GET方法的报文主体没有任何语义。

POST的语义是根据请求负荷（报文主体）对指定的资源做出处理，具体的处理方式视资源类型而不同。POST不安全，不幂等，（大部分实现）不可缓存。为了针对其不可缓存性，有一系列的方法来进行优化。

还是举一个通俗栗子吧，在微博这个场景里，GET的语义会被用在「看看我的Timeline上最新的20条微博」这样的场景，而POST的语义会被用在「发微博、评论、点赞」这样的场景中。

## socket.io

Socket.IO 是一个基于 Node.js 的实时应用程序框架，在即时通讯、通知与消息推送，实时分析等场景中有较为广泛的应用。socket.io基于websocket协议,前后端通过事件进行双向通信.

io.on 监听事件

io.emit 触发事件

socket.io 由两部分组成:

- A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
- A client library that loads on the browser side: socket.io-client


## package.json相关
- "proxy": "http://localhost:9093"//跨域

-  "transform-decorators-legacy"//支持装饰器所用到的插件  https://www.jianshu.com/p/d07ccef9f4f0 --save-dev
- "babel-plugin-import": "^1.6.7",//使用 antd-mobile 时可以按需加载,对应配置在babel->plugins->import中

## 文件结构

component/authrouter  根据权限跳转页面

redux/login 注册和登陆的reducer

containers/bossinfo boss完善信息页面

component/user 用户个人信息

## 中间件



> **It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.**
>
> 这句话来自https://github.com/reduxjs/redux/blob/master/docs/advanced/Middleware.md

在Redux中,中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

Redux thunk 中间件 允许你去写 action creators 返回函数而不是一个 action.

```js
//redux-thunk的源码
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

```js
function createStore(reducer, preloadedState, enhancer) {
  ...
	return enhancer(createStore)(reducer, preloadedState);
  ...
}
  
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

关于Redux-thunk的一篇文章http://taobaofed.org/blog/2016/08/18/react-redux-connect/