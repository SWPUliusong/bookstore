var express = require("express")
var filter = require("./filter")
var app = express()
var port = process.env.port||3000
var dbUrl = "mongodb://localhost:27017/bookstore"

//引入中间件模块
var bodyparser = require("body-parser") //解析请求体
var cookieparser = require("cookie-parser") //固化session
var session = require("express-session")    //固化session
var mongoStore = require("connect-mongo")(session)  //连接mongo
var frouter = require("frouter")   //文件路径即路由


app.locals = filter    //为ejs设置全局属性
app.set("views", __dirname + "/views")   //设置模板根路径
app.set("view engine", "ejs")   //设置模板引擎
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

app.use(frouter(app, "./routes"))


app.use(function(req, res, next) {
    res.status(404).render("error",{user: req.session._user})
})

app.listen(port, function() {
    console.log("server running at "+port+" port")
})