function HashMap() {
  this.default = ""
  this.hashes = []
  this.map = new Map()
  window.onhashchange = this.getState.bind(this)
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