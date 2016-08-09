var Book = require(process.cwd() + "/lib").Book
var Promise = require("bluebird")

exports.get = function(req, res) {
  var skip = 0, opt = {}
  if (req.query.page) {
    skip = ( parseInt(req.query.page) - 1 ) * 10
  }

  Book.fetch(skip)
    .then(function(data) {
      opt.books = data
      return Book.countAll()
    })
    .then(function(data) {
      opt.total = data
      res.status(200).jsonp(opt)
    })
    .catch(function(err) {
      console.log(err)
      res.status(404).jsonp(err)
    })
}

exports.options = function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Methods': 'DELETE'
  })

  res.status(200).json(null)
}

exports.delete = function(req, res) {
  var skip = 0
  if (req.query.page) {
    skip = ( parseInt(req.query.page) - 1 ) * 10
  }

  res.append('Access-Control-Allow-Origin', 'http://localhost:8000')

  Book.removeBook({_id: req.query.id})
    .then(function() {
      return Promise.all([Book.fetch(skip), Book.countAll()])
    })
    .then(function(results) {
      res.status(200).json(results)
    })
    .catch(function(err) {
      res.status(404).json(err)
    })
}