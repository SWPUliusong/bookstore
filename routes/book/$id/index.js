var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var Chapter = require(process.cwd() + "/lib").Chapter
var Comment = require(process.cwd() + "/lib").Comment

//得到单本书
exports.get = function (req, res) {
    var user = req.session._user
    var book_id = req.params.id
    Book.fetchById(book_id, function(err, book) {
        var chapters = null
        User.findById(book.authorId)
            .then(function(data) {
                book.author = data.name
                return Chapter.fetchByBook(book_id)
            })
            .then(function(data) {
                chapters = data.length > 0 ? data : null
                return Comment.getByBookId(book._id)
            })
            .then(function(data) {
                data = data.length > 0 ? data : null
                res.status(200)
                        .render("book",{
                            user : user,
                            book : book,
                            chapters : chapters,
                            comments : data
                        })
            })
            .catch(function(err) {
                console.log(err)
                res.status(404).render("error", {user: user})
            })
    })
}



//删除书籍
exports.delete = function (req, res) {
    var user = req.session._user
    var info = {
        authorId : user && user._id,
        _id : req.params.id
    }
    Book.removeBook(info, function(err, result) {
        if (err) res.status(204).json(null)
        else res.status(200).json(null)
    })
}