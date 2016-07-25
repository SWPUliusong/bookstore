var fs = require("fs")
var Book = require("../models/book")
var Chapter = require("../models/chapter")
var Comment = require("../models/comment")
var util = require("./util")

module.exports = {
	fetch : function(skip, cb) {
		var skip = skip || 0
		Book.find({})
			.sort({"time.update": -1})
			.skip(skip)
			.limit(10)
			.exec(cb)
	},
	fetchById : function(id, cb) {
		Book.findById(id)
			.exec(cb)
	},
	fetchByAuthorId : function(id, cb) {
		Book.find({authorId: id})
			.sort({"time.update": -1})
			.exec(cb)
	},
	fetchRecent : function(cb){
		Book.find({})
			.sort({"time.update": -1})
			.limit(5)
			.select("caption time.update")
			.exec(cb)
	},
	createBook : function(obj, cb) {
		Book.findOne({
			caption : obj.caption,
			authorId : obj.authorId
		}, function(err, book) {
			if (err) cb(err, null)
			else {
				if (book) cb(new Error("you already createed the book"), null)
				else {
					obj = util.format(obj)
					var book = new Book(obj)
					book.save(cb)
				}
			}
		})
	},
	removeBook : function(obj, cb) {
		var info = {
			authorId : obj.authorId,
			_id : obj._id
		}
		Book.findOne(info, function(err, data) {
			if (err) cb(err, null)
			else {
				if (data) {
					if (data.coverImg && data.coverImg !== "img/coverImg.jpg") {
						fs.unlink('static/' + data.coverImg, function(err) {
							if (err) throw err
						})
					}
					Book.remove(data, function(err, result) {
						Chapter.remove({bookId : data._id}, function(err, result) {
							Comment.remove({bookId: data._id}, cb)
						})
					})
				}
				else {
					cb(new Error("not find the book"), null)
				}
			}
		})
	},
	countAll : function(cb) {
		Book.count({}, cb)
	}
}