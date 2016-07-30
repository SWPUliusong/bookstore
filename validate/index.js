
exports.checkLogin = function(req, res, next) {
	if (req.session._user) {
		res.redirect("/")
	}
	else {
		next()
	}
}

exports.checkNotLogin = function(req, res, next) {
	if (req.session._user) next()
	else res.redirect("/login.html")
}