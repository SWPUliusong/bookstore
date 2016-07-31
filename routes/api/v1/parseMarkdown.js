var md = require("markdown-it")()

exports.post = function(req, res) {
	var mdtpl = req.body.mdtpl

	res.status(200).send(md.render(mdtpl))
}