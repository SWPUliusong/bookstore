var fs = require("fs")
var Promise = require("bluebird")
var Book = require("../models/book")
var Chapter = require("../models/chapter")
var Comment = require("../models/comment")
var util = require("./util")
var filter = require("../filter")

module.exports = {
	fetch : function(param) {
		return new Promise(function(resolve, reject) {
			var skip = param || 0
			Book.find({})
				.sort({"time.update": -1})
				.skip(skip)
				.limit(10)
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	fetchById : function(id) {
		return new Promise(function(resolve, reject) {
			Book.findById(id)
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	fetchByAuthorId : function(id) {
		return new Promise(function(resolve, reject) {
			Book.find({authorId: id})
				.sort({"time.update": -1})
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
		
	},
	fetchRecent : function(){
		return new Promise(function(resolve, reject) {
			Book.find({})
				.sort({"time.update": -1})
				.limit(5)
				.select("caption time.update")
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
		
	},
	createBook : function(obj) {
		return new Promise(function(resolve, reject) {
			Book.findOne({
				caption : obj.caption,
				authorId : obj.authorId
			}, function(err, book) {
				if (err) reject(err)
				else {
					if (book) {
						var err = new Error("you already createed the book")
						err.status = 404
						reject(err)
					}
					else {
						obj = util.format(obj)
						Book.create(obj, function(err, data) {
							if (err) reject(err)
							else resolve(data)
						})
					}
				}
			})
		})
	},
	removeBook : function(obj) {
		return new Promise(function(resolve, reject) {
			Book.findOne(obj, function(err, data) {
				if (err) reject(err)
				else {
					if (data) {
						if (data.coverImg !== "img/coverImg.jpg") {
							fs.unlink(filter.comcat(data.coverImg), function(err) {
								if (err) throw err
							})
						}
						Book.remove(data, function(err, result) {
							if (err) return reject(err)
							Chapter.remove({bookId : data._id}, function(err, result) {
								if (err) return reject(err)
								Comment.remove({bookId: data._id}, function(err, data) {
									if (err) reject(err)
									else resolve(data)
								})
							})
						})
					}
					else {
						reject(new Error("not find the book"))
					}
				}
			})
		})
	},
	countAll : function(obj) {
		var obj = obj || {}
		return new Promise(function(resolve, reject) {
			Book.count(obj, function(err, data) {
				if (err) reject(err)
				else resolve(data)
			})
		})
	}
}