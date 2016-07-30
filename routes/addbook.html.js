var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin
//添加书籍页
exports.get = [checkNotLogin, function (req,res) {
    var user=req.session._user
    res.status(200).render("user/addbook",{user : user})

}]