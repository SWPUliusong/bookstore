var crypto = require("crypto")
var path = require("path")

exports.formatTime = function(time) {
	if (typeof time !== 'object') {
		time = new Date(time)
	}
	var month = time.getMonth() + 1
	var date = time.getDate()
	var h = time.getHours()
	var m = time.getMinutes()
	var s = time.getSeconds()
	var pre = [time.getFullYear(),
		month >= 10 ? month : "0" + month,
		date >= 10 ? date : "0" + date].join("-")
	var next = [h >= 10 ? h : "0" + h,
		m >= 10 ? m : "0" + m,
		s >= 10 ? s : "0" + s].join(":")

	return pre + " " + next
}

exports.md5 = function (str) {
	return crypto.createHash("md5").update(str).digest('hex')
}

exports.formatPath = function (p) {
	if (!path.isAbsolute(p)) {
		p = process.cwd() + "/" + p
	}
	return p.replace(new RegExp("\\" + path.sep, 'g'), '/')
		.split("static/")[1]
}

exports.concatPath = function (p) {
	return path.join("static/", p)
}