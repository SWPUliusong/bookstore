'use strict'

const path = require("path")
const fs = require("fs")

function ls(dir, _pending, _result) {
  _pending = _pending ? _pending++ : 1;
  _result = _result || [];

  // if error, throw it
  try {
    var stat = fs.lstatSync(dir);
  } catch (err) {
    console.log(err)
  }

  if (stat.isDirectory()) {
    var files = fs.readdirSync(dir);
    files.forEach(function (part) {
      ls(path.join(dir, part), _pending, _result);
    });
    if (--_pending === 0) {
      return _result;
    }
  } else {
    _result.push(dir);
    if (--_pending === 0) {
      return _result;
    }
  }
};

module.exports = ls