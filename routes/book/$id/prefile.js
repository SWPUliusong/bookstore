var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var Comment = require(process.cwd() + "/lib").Comment
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//得到单本书
exports.get = [checkNotLogin, function (req, res, next) {
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
            return Comment.getByBookId(book_id)
        })
        .then(function(data) {
            opt.comments = data.length > 0 ? data : null
            res.status(200).render("book/index", opt)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]