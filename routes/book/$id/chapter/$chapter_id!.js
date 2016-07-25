var Book = require(process.cwd() + "/lib").Book
var Chapter = require(process.cwd() + "/lib").Chapter

//获取章节内容
exports.get = function (req, res) {
    var user = req.session._user
    Book.fetchById(req.params.id, function(err, book) {
        if (err) res.status(500).json(err)
        else {
            Chapter.fetchById(req.params.chapter_id)
                .then(function(chapter) {
                    res.status(200)
                        .render("chapter",{
                            user : user,
                            book : book,
                            chapter : chapter
                        })
                })
                .catch(function(err) {
                    res.status(404).json(err)
                })
        }
    })
}

//添加章节
exports.post = function (req, res) {
    var user=req.session._user
    if (user) {
        var data = req.body
        data.bookId = req.params.id
        Chapter.addChapter(data)
            .then(function(data) {
                res.status(200).json(user)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
    else {
        res.status(401).redirect("/login.html")
    }
}
