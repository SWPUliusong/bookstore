//登录页
exports.get = function (req, res){
    var user = req.session._user
    if(user){
        res.status(200).redirect("/")
    }else{
        res.status(401).render("login",{user : null})
    }
}