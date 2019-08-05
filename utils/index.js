let toString = Object.prototype.toString

module.exports.isPureObject = function(obj) {
  return toString.call(obj) === '[object Object]'
}

module.exports.isUndef = function(v) {
  return v === null || v === undefined
}