var mongoose=require("mongoose")
var Schema=mongoose.Schema;

var User = new Schema({
    name : {
    	type : String,
    	default : "匿名用户"
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
    create_at : {
        type : Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("User",User);