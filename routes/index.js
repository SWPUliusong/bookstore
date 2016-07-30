var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//直接访问主页时cookie验证用户
exports.get = [checkNotLogin, function (req, res){
    var opt = {user: req.session._user}
    Book.countAll()
        .then(function(count) {
            opt.count = Math.ceil(count / 10)
            return Book.fetchRecent()
        })
        .then(function(recent) {
            opt.recent = recent
            return  Book.fetch()
        })
        .then(function(books) {
            opt.books = books
            res.status(200).render("home", opt)
        })
        .catch(function(err) {
            res.status(404).json(null)
            console.log(err)
        })
}]

//登录验证
exports.post = function (req, res){
    var info = {
        email : req.body.email,
        password : req.body.password
    };
    User.findByEmail(info)
        .then(function(user) {
            req.session._user = user
            res.status(200).json(null)
        })
        .catch(function(err) {
            res.status(403).json(null)
        })
}