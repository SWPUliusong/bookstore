var User = require(process.cwd() + "/lib").User

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

//注册
exports.post = [upload.single("avatar"), function userRegister(req,res) {
    User.createUser(req.body)
        .then(function(user) {
            req.session._user = user
            res.status(200).json(null)
        })
        .catch(function(err) {
            res.status(403).json(err)
        })
}]