function HashMap() {
  this.default = ""
  this.hashes = []
  this.map = new Map()
  window.onhashchange = this.getState.bind(this)
  window.onload = this.getState.bind(this)  //进入时获取保存的ajax状态
}

HashMap.prototype.register = function(obj) {
  if (!obj.url) throw "没有可取的hash值"
  if (!obj.ctrl) throw "没有对应的handle"

  if (obj.default) {
    this.default = obj.url
  }

  this.hashes.push(obj.url)
  this.map.set(obj.url, obj.ctrl)

  return this
}

HashMap.prototype.getState = function() {
  var hash = location.hash.substr(1)
  if (this.hashes.indexOf(hash) > -1) {
    var ctrl = this.map.get(hash)
    ctrl()
  }
  else {
    location.hash = this.default
  }
}

HashMap.prototype.next = function() {
  var hashes = this.hashes
  var hash = location.hash.substr(1)
  var index = hashes.indexOf(hash)

  if (index < hashes.length - 1) {
    location.hash = hashes[index + 1]
  }

  return this
}

HashMap.prototype.prev = function() {
  var hashes = this.hashes
  var hash = location.hash.substr(1)
  var index = hashes.indexOf(hash)

  if (index > 0) {
    location.hash = hashes[index - 1]
  }

  return this
}