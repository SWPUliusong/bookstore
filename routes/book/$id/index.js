var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var Chapter = require(process.cwd() + "/lib").Chapter
var Comment = require(process.cwd() + "/lib").Comment
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//得到单本书
exports.get = [checkNotLogin, function (req, res) {
    var user = req.session._user
    var book_id = req.params.id
    var opt = {user: user}
    Book.fetchById(book_id)
        .then(function(book) {
            opt.book = book
            return  User.findById(book.authorId)
        })
        .then(function(data) {
            opt.author = data
            return Chapter.fetchByBook(book_id)
        })
        .then(function(data) {
            opt.chapters = data.length > 0 ? data : null
            return Comment.getByBookId(opt.book._id)
        })
        .then(function(data) {
            opt.comments = data.length > 0 ? data : null
            res.status(200).render("book", opt)
        })
        .catch(function(err) {
            console.log(err)
            res.status(404).render("error", opt)
        })
}]



//删除书籍
exports.delete = function (req, res) {
    var user = req.session._user
    var info = {
        authorId : user && user._id,
        _id : req.params.id
    }
    Book.removeBook(info)
        .then(function(result) {
            res.status(200).json(null)
        })
        .catch(function(err) {
            console.log(err)
            res.status(204).json(null)
        })
}