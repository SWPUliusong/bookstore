var Book = require(process.cwd() + "/lib").Book
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//获取添加章节页
exports.get = [checkNotLogin, function (req, res) {
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
                res.status(403).send("你没有权限或登录已过期")
            }
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json(err)
        })
}]