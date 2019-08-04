const Dep = require('./dep')
const scope = require('./scope')
const {
  isPureObject
} = require('../utils')

function observe(obj) {
  if (!isPureObject(obj)) {
    throw `只支持监听object类型的值`
  }
  Object.keys(obj).forEach(key => {
    defineDerective(obj, key)
  })
}

function defineDerective(obj, key) {
  let value = obj[key]
  // 对于每个value都创建一个Dep实例，用于：
  // 1.更新数据时，通知 依赖项
  // 2.获取数据时，绑定 依赖项
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    set(newValue) {
      if (newValue !== value) {
        dep.notify()
      }
      if (isPureObject(newValue)) {
        observe(newValue)
      }
      value = newValue
    },
    get() {
      if (scope.watcher) {
        dep.bindWatcher(scope.watcher)
      }
      return value
    }
  })
}

module.exports = observe