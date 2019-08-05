const scope = require('./scope')
const { isUndef } = require('../utils')

function initWatch(vm, watch) {
  Object.keys(watch).forEach(key => {
    let currentValue
    scope.watcher = function() {
      let latestValue = getValue(vm, key)
      watch[key].call(vm, latestValue, currentValue)
      currentValue = latestValue
    }
    // 通过获取值，触发对应getter，来实现 值与该watch的绑定关系
    currentValue = getValue(vm, key)
    // console.log('currentValue');
    // console.log(currentValue);
    scope.watcher = null
  })
}

// 获取以点分隔的属性值 如 key = 'address.home'
function getValue(vm, key) {
  const strs = key.split('.')
  let k = vm
  for (let i = 0; i < strs.length; i++) {
    if (!k) return
    k = k[strs[i]]
  }
  return k
  // const k = strs.reduce((prev, curr) => {
  //   let value = prev[curr]
  //   return isUndef(value) ? {} : value
  // }, vm)
  // 下面这种取值方式，会执行两次vm[curr]，即获取两次vm[curr]，可先进行获取 再判断。或采用
  // const k = strs.reduce((prev, curr) => {
  //   return isUndef(vm[curr]) ? {} : vm[curr]
  // }, vm)
}

module.exports = initWatch