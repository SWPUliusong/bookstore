var User = require(process.cwd() + "/lib").User
var filter = require(process.cwd() + "/filter")
var fs = require("fs")
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//文件解析
var multer = require("multer");
var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, process.cwd() + "/static/img/user/")
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({storage:storage})


exports.get = function(req, res) {
	var id = req.params.id
	User.findById(id)
		.then(function(data) {
			res.status(200).json(data)
		})
		.catch(function(err) {
			res.status(404).json(null)
		})
}

exports.post = [upload.single("avatar"), checkNotLogin, function(req, res) {
	var user = req.session._user
	var avatar = filter.formatPath(req.file.path)
	User.findById(user._id)
		.then(function(data) {
			if (data.avatar !== "img/avatar.png") {
				fs.unlink(filter.comcatPath(data.avatar))
			}
			return User.modifyAvatarById(user._id, avatar)
		})
		.then(function(data) {
			req.session._user.avatar = data
			res.status(200).send(data)
		})
		.catch(function(err) {
			console.log(err)
			res.status(500).json(null)
		})
}]