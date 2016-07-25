var Comment = require(process.cwd() + "/lib").Comment
//增加评论
exports.post = function (req, res) {
    var user = req.session._user
    if (user) {
        var book_id = req.params.id
        var obj = {
            bookId : book_id,
            user : {
                name : user.name,
                avatar : user.avatar
            },
            content : req.body.content
        }
        Comment.addComment(obj)
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(err) {
                console.log(err)
                res.status(500).json(err)
            })
    }
    else {
        res.status(401).redirect("/login.html")
    }
}
