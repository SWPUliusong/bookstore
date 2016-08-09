var Book = require(process.cwd() + "/lib").Book
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

exports.get = [checkNotLogin, function(req, res, next) {
	var user = req.session._user
	var opt = {user: user}
	Book.countAll({authorId: user._id})
		.then(function(count) {
			opt.count = count
			if (req.query.self) {
				res.status(200).render("user/info", opt)
			}
			else {
				res.status(200).render("user/index", opt)
			}
		})
		.catch(function(err) {
			console.log(err)
			next(err)
		})
}]