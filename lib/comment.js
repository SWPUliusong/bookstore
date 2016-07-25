var Comment = require("../models/comment")
var md = require("markdown-it")()
var util = require("./util")
var Promise = require("bluebird")

module.exports = {
	addComment : function(obj) {
		obj.content = md.render(obj.content)
		obj = util.format(obj)
		return new Promise(function(resolve, reject) {
			Comment.create(obj, function(err, data) {
				if (err) reject(err)
				//查询结果data为只读对象，不能写,所以将他的属性复制出来
				var comment = {
					bookId: data.bookId,
					user: data.user,
					content: data.content
				}
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
	}
}