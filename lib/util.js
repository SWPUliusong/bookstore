function format(obj) {
	if (typeof obj === 'object') {
		obj = JSON.stringify(obj)
	}
	obj = obj.replace(/script>/g,"script&gt;")
	return JSON.parse(obj)
}

exports.format = format