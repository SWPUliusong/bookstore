var Comment = require(process.cwd() + "/lib").Comment
var User = require(process.cwd() + "/lib").User
var filter = require(process.cwd() + "/filter")
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin
//增加评论
exports.post = [checkNotLogin, function (req, res) {
    var user = req.session._user
    var book_id = req.params.id
    var opt = {}
    var obj = {
        bookId : book_id,
        criticId : user._id,
        content : req.body.content
    }
    Comment.addComment(obj)
        .then(function(data) {
            opt.content = data.content
            opt.count = data.count
            opt.create_at = filter.formatTime(data.create_at)
            return User.findById(data.criticId)
        })
        .then(function(data) {
            opt.critic = data
            res.status(200).json(opt)
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json(err)
        })
}]

exports.get = function(req, res) {
    var book_id = req.params.id
    Comment.getByBookId(book_id)
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json(err)
        })
}
