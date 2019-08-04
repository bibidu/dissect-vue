function Dep() {
  if (!(this instanceof Dep)) {
    return new Dep()
  }
  this.watchers = []
}

Dep.prototype.notify = function() {
  this.watchers.forEach(watcher => watcher())
}

Dep.prototype.bindWatcher = function(watcher) {
  this.watchers.push(watcher)
}

module.exports = Dep