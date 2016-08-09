var Book = require(process.cwd() + "/lib").Book
var User = require(process.cwd() + "/lib").User
var filter = require(process.cwd() + "/filter")
//文件解析
var multer = require("multer");
var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "static/img/book/")
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({storage:storage})
var url = require("url")
//分情况获取用户所有书籍
exports.get = [function(req, res, next){
    var user = req.session._user
    var id = req.params.id

    if (user._id == id && req.query.self) {
        Book.fetchByAuthorId(id)
            .then(function(data) {
                var books = data.length > 0 ? data : null
                res.status(200)
                    .render("user/mybooks", {
                        user : user,
                        books : books
                    })
                })
    }
    else {
        next()
    }
}, function (req, res, next) {
    var user = req.session._user
    var id = req.params.id
    var opt = {user: user}
    Book.fetchByAuthorId(id)
        .then(function(data) {
            opt.books = data.length > 0 ? data : null
            return User.findById(id)
        })
        .then(function(data) {
            opt.author = data
            res.status(200)
                .render("userbooks", opt)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]

//用户添加书籍
exports.post = [upload.single("coverImg"), function (req,res, next) {
    var user = req.session._user
    if (user) {
        var book = req.body
        book.authorId = user._id
        book.coverImg = req.file && filter.formatPath(req.file.path)
        Book.createBook(book)
            .then(function(data) {
                res.status(200).json(user)
            })
            .catch(function(err) {
                console.log(err)
                next(err)
            })
    }
    else {
        res.status(401).redirect("/login.html")
    }
}]