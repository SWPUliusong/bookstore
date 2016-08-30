var cluster = require("cluster")
var cpus = require("os").cpus()

cluster.setupMaster({
  exec: "./app.js"
})

for (var i = 0; i < cpus.length; i++) {
  cluster.fork()
}

cluster.on('fork', function(worker) {
  console.log('worker pid: ' + worker.process.pid)
})