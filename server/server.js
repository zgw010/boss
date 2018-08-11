const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const model = require("./model");
const path = require("path");

const User = model.getModel("user");
const Chat = model.getModel("chat");
const app = express();
//work with express
//socket.io和express绑定起来
const server = require('http').Server(app)
const io = require("socket.io")(server);
// io 是权限连接的请求
//socket 是这个连接的请求


io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    // console.log(data)
    const {
      from,
      to,
      msg
    } = data;
    const chatid = [from, to].sort().join('_')
    console.log(chatid)
    Chat.create({
      chatid,
      from,
      to,
      content: msg
    }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // io.emit('recvmsg', data)

  })
  console.log('login')
})

const userRouter = require("./user");


app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);//访问后端/user,使用userRouter
app.use(function(req,res,next){
  // 如果命中的路由是user开头或者static开头,直接执行下一步
  if(req.url.startsWith('/user')||req.url.startsWith('/static')){
    return next();
  }
  // 否则就渲染首页
  console.log("path.resolve('build.index.html')",path.resolve('build/index.html'))
  return res.sendFile(path.resolve('build/index.html'))
})
// 拦截所有路由
app.use("/",express.static(path.resolve('build')))
server.listen(9093, function() {
  console.log("ok 9093");
});