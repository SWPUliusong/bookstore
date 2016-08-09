var User = require(process.cwd() + "/lib").User
var Book = require(process.cwd() + "/lib").Book
var Comment = require(process.cwd() + "/lib").Comment
var Promise = require("bluebird")
var os = require("os")

exports.get = function(req, res) {
  var webinfo = {}
  var serverinfo = {
    name: os.type(),
    platform: os.platform(),
    loadavg: os.loadavg(),
    rss: (os.totalmem() - os.freemem()) / os.totalmem()
  }

  Promise.all([User.countAll(), Book.countAll(), Comment.countAll()])
    .then(function(results) {
      webinfo.userNum = results[0]
      webinfo.bookNum = results[1]
      webinfo.commentNum = results[2]
      res.status(200).jsonp({
        webInfo: webinfo,
        serverInfo: serverinfo
      })
    })
    .catch(function(err) {
      res.status(500).jsonp(null)
    })
}