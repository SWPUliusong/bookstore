var User = require("../models/user")
var Promise = require("bluebird")
var Book = require("./book")
var md5 = require(process.cwd() + "/filter").md5

module.exports = {
	fetchAll: function(){
		return new Promise(function(resolve, reject) {
			User.find({})
				.select("-password -avatar")
				.exec(function(err, data) {
					if (err) reject(err)
			    else resolve(data)
				})
		})
	},
	createUser : function(obj) {
		return new Promise(function(resolve, reject) {
			User.findOne({email : obj.email})
				.exec(function(err,user){
					if (err) reject(err)
			        if(user){
			        	var err = new Error('email already exists')
			        	err.status = 403
			          reject(err)
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
	modifyById: function(id, obj) {
		return new Promise(function(resolve, reject) {
			User.update({_id: id}, {$set: obj}, function(err, data) {
				if (err) reject(err)
				else {
					User.findById(id, function(err, data) {
						if (err) reject(err)
						else resolve(data)
					})
				}
			})
		})
	},
	countAll: function(obj) {
		var obj = obj || {}
		return new Promise(function(resolve, reject) {
			User.count(obj, function(err, count) {
				if (err) reject(err)
				else resolve(count)
			})
		})
	}
}