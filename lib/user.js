var User = require("../models/user")
var Promise = require("bluebird")

module.exports = {
	createUser : function(obj) {
		return new Promise(function(resolve, reject) {
			User.findOne({email : obj.email})
				.exec(function(err,user){
					if (err) reject(err)
			        if(user){
			            reject(new Error('email already exists'))
			        }else{
			        	User.create(obj, function(err, data) {
			        		if (err) reject(err)
			        		else resolve(data)
			        	})
			        }
			    })
		})
	},
	findById : function(id) {
		return new Promise(function(res, rej) {
			User.findOne({_id : id})
				.exec(function(err, data) {
					if (err) rej(err)
					else res(data)
				})
		})
		
	},
	findByEmail : function(obj){
		return new Promise(function(resolve, reject) {
			User.findOne({
			        email : obj.email,
			        password : obj.password
			    })
		    	.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	}
}