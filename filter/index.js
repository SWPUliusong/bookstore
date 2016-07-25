exports.formatTime = function(time) {
	var month = time.getMonth() + 1
	var date = time.getDate()
	return [time.getFullYear(),
		month > 10 ? month : "0" + month,
		date > 10 ? date : "0" + date].join("-")
}