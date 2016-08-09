var Book = require(process.cwd() + "/lib").Book
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//获取添加章节页
exports.get = [checkNotLogin, function (req, res, next) {
    var user=req.session._user
    var id = req.params.id
    Book.fetchById(id)
        .then(function(book) {
            if (book.authorId == user._id) {
                res.status(200).render("addChapter",{
                    user : user,
                    book : book
                })
            }
            else {
                var err = new Error("你没有权限")
                err.status = 403
                next(err)
            }
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]