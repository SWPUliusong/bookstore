var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var Comment = new Schema({
	bookId : {type: ObjectId, required: true},
	criticId : {type: ObjectId, required: true},
	content : {type: String, required: true},
	create_at : {type: Date, default: Date.now}
})

module.exports = mongoose.model("Comment", Comment)