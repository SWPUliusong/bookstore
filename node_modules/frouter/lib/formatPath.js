'use strict'

var path = require("path")

function formatPath(filePath, root, wildcard, ignorable) {
	return filePath
		.replace(/\\/g, "/")
		.replace(root, "")
		.replace(new RegExp('/\\' + wildcard, 'g'), "/:")
		.replace(new RegExp('\\' + ignorable, 'g'), "?")
		.split(".js")[0]
		.replace(/\/index$/g, "/")
}

module.exports = formatPath