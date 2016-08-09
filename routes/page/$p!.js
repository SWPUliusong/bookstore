var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

exports.get = [checkNotLogin, function (req, res, next){
    var user = req.session._user
    var opt = {user: user}
    var page = parseInt(req.params.p) - 1
    if (typeof page !== 'number' || page < 1) {
        res.status(302).redirect("/")
        return
    }
    Book.countAll()
        .then(function(count) {
            opt.count = Math.ceil(count / 10)
            return Book.fetchRecent()
        })
        .then(function(recent) {
            opt.recent = recent
            return Book.fetch(page * 10)
        })
        .then(function(books) {
            opt.books = books
            res.status(200).render("home", opt)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]