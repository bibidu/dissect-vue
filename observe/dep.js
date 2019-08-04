function Dep() {
  if (!(this instanceof Dep)) {
    return new Dep()
  }
}

Dep.prototype.notify = function() {
  console.log('notify');
}

Dep.prototype.bindWatcher = function() {
  console.log('bindWatcher');
}

module.exports = Dep