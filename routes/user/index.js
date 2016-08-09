var User = require(process.cwd() + "/lib").User

//注册
exports.post = function (req,res, next) {
    User.createUser(req.body)
        .then(function(user) {
            req.session._user = user
            res.status(200).json(null)
        })
        .catch(function(err) {
          console.log(err)
          next(err)
        })
}