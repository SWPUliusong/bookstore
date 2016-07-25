var mongoose=require("mongoose")
var Schema=mongoose.Schema;

var Chapter = new Schema({
    bookId: Schema.Types.ObjectId,
    title: String,
    text: String,
    time: {
    	create : {
    		type : Date,
    		default : Date.now()
    	},
    	update : {
    		type : Date,
    		default : Date.now()
    	}
    }
})

Chapter.pre("save", function(next) {
	if (this.isNew) {
		this.time.create = this.time.update = Date.now()
	}
	else {
		this.time.update = Date.now()
	}
	next()
})


module.exports = mongoose.model("Chapter",Chapter);