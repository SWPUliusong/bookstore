//注册页
exports.get = function (req, res) {
    res.status(200).render("register", {user : null})
}