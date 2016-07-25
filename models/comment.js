var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var Comment = new Schema({
	bookId : {type: ObjectId, required: true},
	user : {
		name : {type: String, required: true},
		avatar : {type: String, required: true}
	},
	content : {type: String, required: true},
	create_at : {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Comment", Comment)