var express = require("express")
var filter = require("./filter")
var logger = require('morgan');
var app = express()
var port = process.env.port||3000
var dbUrl = "mongodb://localhost:27017/bookstore"

//引入中间件模块
var bodyparser = require("body-parser")
var cookieparser = require("cookie-parser")
var session = require("express-session")
var mongoStore = require("connect-mongo")(session)
var frouter = require("frouter")


app.locals = filter    //为ejs设置全局属性
app.set("views", __dirname + "/views")   //设置模板根路径
app.set("view engine", "ejs")   //设置模板引擎
app.use(logger("dev"))  //控制台打印访问信息
app.use(bodyparser.json())  //调用body-parser解析json数据
app.use(bodyparser.urlencoded({extended:false}))    //调用body-parser解析表单数据
app.use(express.static(__dirname+"/static"))

//固化session数据到mongoDB
app.use(cookieparser())
app.use(session({
    store : new mongoStore({url : dbUrl}),
    cookie : {
        maxAge : 1000*60*60
    },
    secret : "bookstore",
    resave : false,
    saveUninitialized : true
}))

//post,delete跨域
app.use(function(req, res, next) {
  if (req.method === "OPTIONS") {   
    res.set({
      'Access-Control-Allow-Origin': 'http://localhost:8000',
      'Access-Control-Allow-Methods': 'DELETE,POST,PUT'
    })
    res.status(200).json(null)
  }
  else {
    next()
  }
})

//文件路径即路由
app.use(frouter(app, "./routes"))

//404
app.use(function(req, res, next) {
  var err = new Error("Not Find")
  err.status = 404
  next(err)
})

//错误捕获
app.use(function(err, req, res, next) {
  err.status = err.status || 500
  res.status(err.status).render("error", {
    user: req.session._user,
    error: err
  })
})

app.listen(port, function() {
  console.log("server is running at " + port + " port")
})