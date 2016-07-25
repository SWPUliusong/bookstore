var mongoose = require("mongoose")
var dbUrl = "mongodb://localhost:27017/bookstore"
mongoose.connect(dbUrl)

exports.User = require("./user")
exports.Book = require("./book")
exports.Chapter = require("./chapter")
exports.Comment = require("./comment")