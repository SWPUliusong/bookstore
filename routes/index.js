var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var Promise = require("bluebird")
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//直接访问主页时cookie验证用户
exports.get = [checkNotLogin, function (req, res, next){
    var opt = {user: req.session._user}
    /*Promise.all([Book.countAll(), Book.fetchRecent(), Book.fetch()])
        .then(function(result_arr) {
            opt.count = Math.ceil(result_arr[0] / 10)
            opt.recent = result_arr[1]
            opt.books = result_arr[2]
            res.status(200).render("home", opt)
        })
        .catch(function(err) {
            res.status(404).json(null)
            console.log(err)
        })*/
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
            console.log(err)
            next(err)
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
            if (user) {
                req.session._user = user
                res.status(200).json(null)
            }
            else {
                res.status(404).json(null)
            }
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}