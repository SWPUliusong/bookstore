var checkLogin = require(process.cwd() + "/validate").checkLogin
//登录页
exports.get = [checkLogin, function (req, res){
    res.status(401).render("login",{user : null})
}]