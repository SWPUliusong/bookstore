var mongoose=require("mongoose")
var Schema=mongoose.Schema;

var User = new Schema({
    name : {
    	type : String,
    	required : true
    },
    avatar : {
    	type : String,
    	default : "img/avatar.png"
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});


module.exports = mongoose.model("User",User);