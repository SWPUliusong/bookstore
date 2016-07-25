var Book = require(process.cwd() + "/lib").Book
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

//获取用户所有书籍
exports.get = function (req, res) {
    var user = req.session._user
    var id = req.params.id
    if (user) {
		if (user._id === id) {
            Book.fetchByAuthorId(id, function(err,data) {
                if (err) console.log(err)
                var books = data.length > 0 ? data : null
                res.status(200)
                    .render("mybooks",{
                        user : user,
                        books : books
                    })
            })
        }
        else {
            res.status(403).send("你没有权限")
        }
	}
    else {
        res.status(401).redirect("/login.html")
    }
}

//用户添加书籍
exports.post = [upload.single("coverImg"), function (req,res) {
    var user = req.session._user
    if (user) {
        var book = req.body
        book.authorId = user._id
        book.coverImg = req.file && req.file.path.split("static\\")[1]
        Book.createBook(book, function(err, book) {
            if (err) res.status(403).json(err)
            else res.status(200).json(user)
        })
    }
    else {
        res.status(401).redirect("/login.html")
    }
}]