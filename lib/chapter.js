var Promise = require("bluebird")
var md = require("markdown-it")()
var util = require("./util")
var Chapter = require("../models/chapter")

module.exports = {
	fetchByBook : function(book_id) {
		return new Promise(function(resolve, reject) {
			Chapter.find({bookId : book_id})
				.sort({"time.create" : -1})
				.exec(function(err, data) {
					if(err) reject(err)
					else resolve(data)
				})
		})
	},
	fetchById : function(_id) {
		return new Promise(function(resolve, reject) {
			Chapter.findById(_id)
				.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	addChapter : function(obj, cb) {
        obj.text = md.render(obj.text)
        obj = util.format(obj)
		return new Promise(function(resolve, reject) {
			var chapter = new Chapter(obj)
			chapter.save(function(err, data) {
				if (err) reject(err)
				else resolve(data)
			})
		})
	}
}