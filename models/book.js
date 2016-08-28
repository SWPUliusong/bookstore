var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Book = new Schema({
    caption : {type: String, required: true},
    type : {type: String, required: true},
    authorId : {type: Schema.Types.ObjectId, required: true},
    description : String,
    coverImg : {
    	type : String,
    	default : "img/coverImg.jpg"
    },
    time : {
    	create : {
    		type : Date,
    		default : Date.now
    	},
    	update : {
    		type : Date,
    		default : Date.now
    	}
    }
});

Book.pre("save", function(next) {
	if (this.isNew) {
		this.time.create = this.time.update = Date.now()
	}
	else {
		this.time.update = Date.now()
	}

	next()
})

module.exports = mongoose.model("Book",Book);