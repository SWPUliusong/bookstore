'use strict'

const path = require("path")
const formatPath = require("./lib/formatPath")
const ls = require("./lib/ls")

function frouter(app, opt) {

	if (typeof opt === 'string') {
		if (!path.isAbsolute(opt)) {
		    opt = path.join(process.cwd(), opt);
		}
		opt = {root: opt.replace(/\\/g, "/")}
	} 
	else if (!opt || !opt.root) {
    	throw new Error('root config required.');
  	}

	var wildcard = opt.wildcard || '$';
	var ignorable = opt.ignorable || '!'
  	var root = opt.root;

  	ls(root).forEach(function(filepath) {
  		var exportFuncs = require(filepath);
	    var pathRegexp = formatPath(filepath, root, wildcard, ignorable);
	    console.log(pathRegexp)

	    for (var method in exportFuncs) {

		    if (!Array.isArray(exportFuncs[method])) {
		    	exportFuncs[method] = [exportFuncs[method]]
		    }
		    exportFuncs[method].unshift(pathRegexp)

	        app[method].apply(app, exportFuncs[method])
	    };
  	})

  	return function (req, res, next){
  		next()
  	}

}

module.exports = frouter