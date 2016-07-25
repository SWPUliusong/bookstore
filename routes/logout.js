//退出
exports.get = function (req,res){
    req.session._user = null
    res.status(401).redirect("/login.html")
}