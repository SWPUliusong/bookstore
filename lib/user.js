var User = require("../models/user")
var Promise = require("bluebird")
var md5 = require(process.cwd() + "/filter").md5

module.exports = {
	createUser : function(obj) {
		return new Promise(function(resolve, reject) {
			User.findOne({email : obj.email})
				.exec(function(err,user){
					if (err) reject(err)
			        if(user){
			            reject(new Error('email already exists'))
			        }else{
			        	obj.password = md5(obj.password)
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
				.select("-password")
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
			        password : md5(obj.password)
			    })
		    	.exec(function(err, data) {
					if (err) reject(err)
					else resolve(data)
				})
		})
	},
	modifyAvatarById: function(id, str) {
		if (typeof str !== 'string') throw new Error("avatar path is unvalid")
		return new Promise(function(resolve, reject) {
			User.update({_id: id}, {$set: {avatar: str}}, function(err, data) {
				if (err) reject(err)
				else {
					User.findById(id, function(err, data) {
						if (err) reject(err)
						else resolve(data.avatar)
					})
				}
			})
		})
	}
}