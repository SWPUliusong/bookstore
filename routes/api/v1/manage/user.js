var User = require(process.cwd() + "/lib").User
var md5 = require(process.cwd() + "/filter").md5
var qs = require("querystring")

exports.get = function(req, res) {
  User.fetchAll()
    .then(function(users) {
      res.status(200).jsonp(users)
    })
    .catch(function(err) {
      res.status(500).jsonp(null)
    })

}

exports.put = function(req, res) {
  var psw = md5("123456")
  var param = new Buffer('')
  req.on('data', function(data) {
    param = Buffer.concat([param, data])
  })

  req.on('end', function() {
    res.append("Access-Control-Allow-Origin", "http://localhost:8000")
    User.modifyById(qs.parse(param.toString()).id, {password: psw})
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        console.log(err)
        res.status(500).json(null)
      })
  })
}

exports.post = function(req, res) {
  res.append("Access-Control-Allow-Origin", "http://localhost:8000")
  var param = new Buffer('')

  req.on('data', function(data) {
    param = Buffer.concat([param, data])
  })

  req.on('end', function() {
    var body = JSON.parse(param.toString())
    User.createUser(body)
      .then(function() {
        return User.fetchAll()
      })
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(err) {
        res.status(404).json(err)
      })
    //console.log(body)
  })
}