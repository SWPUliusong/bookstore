//添加书籍页
exports.get = function (req,res) {
    var user=req.session._user
    if (user) {
        res.status(200).render("addbook",{user : user})
    }
    else {
        res.status(401).redirect("/login.html")
    }
}