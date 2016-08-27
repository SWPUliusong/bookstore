var Comment = require("../models/comment")
var md = require("markdown-it")()
var util = require("./util")
var Promise = require("bluebird")

module.exports = {
	fetch : function(param) {
		return new Promise(function(resolve, reject) {
			var skip = param || 0
			Comment.find({})
				.sort({"create_at": -1})
				.skip(skip)
				.limit(10)
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	addComment : function(obj) {
		obj.content = md.render(obj.content)
		obj = util.format(obj)
		return new Promise(function(resolve, reject) {
			Comment.create(obj, function(err, data) {
				if (err) reject(err)
				
				var comment = data.toObject()
				Comment.count({bookId: obj.bookId}, function(err, result) {
					if (err) reject(err)
					else {
						comment.count = result
						resolve(comment)
					}
				})
			})
		})
	},
	getByBookId : function(id) {
		return new Promise(function(resolve, reject) {
			Comment.find({bookId: id})
				.sort("-create_at")
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	countAll: function(obj) {
		var obj = obj || {}
		return new Promise(function(resolve, reject) {	
			Comment.count(obj, function(err, data) {
				if (err) reject(err)
				else resolve(data)
			})
		})
	},
	removeComment: function(obj) {
		return new Promise(function(resolve, reject) {	
			Comment.remove(obj, function(err, data) {
				if (err) reject(err)
				else resolve(data)
			})
		})
	}
}