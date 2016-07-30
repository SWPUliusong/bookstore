var checkLogin = require(process.cwd() + "/validate").checkLogin
//注册页
exports.get =[checkLogin, function (req, res) {
    res.status(200).render("register", {user : null})
}]