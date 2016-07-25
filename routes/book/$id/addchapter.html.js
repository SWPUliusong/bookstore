var Book = require(process.cwd() + "/lib").Book

//获取添加章节页
exports.get = function (req, res) {
    var user=req.session._user
    if (user) {
        var id = req.params.id
        Book.fetchById(id, function(err, book) {
            if (err) throw err
            else if (book.authorId == user._id) {
                res.status(200).render("addChapter",{
                    user : user,
                    book : book
                })
            }
            else {
                res.status(403).send("你没有权限")
            }
        })
    }
    else {
        res.status(401).redirect("/login.html")
    }
}