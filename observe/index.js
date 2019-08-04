const Dep = require('./dep')
const scope = require('./scope')
const initComputed = require('./computed')
const {
  isPureObject
} = require('../utils')

function observe(vm, obj) {
  if (!isPureObject(obj)) {
    throw `只支持监听object类型的值`
  }
  Object.keys(obj).forEach(key => {
    defineDirective(vm, key, obj[key])
  })
}

function defineDirective(obj, key, value) {
  // let value = obj[key]                                                                                                                                                                                                                                                                                                                                  
  // 对于每个value都创建一个Dep实例，用于：
  // 1.更新数据时，通知 依赖项
  // 2.获取数据时，绑定 依赖项
  let dep = new Dep()
    console.log(`key ${key}`);
    Object.defineProperty(obj, key, {
    set(newValue) {
      // 关键点： 先赋值 再执行notify通知
      value = newValue

      dep.notify()  
      if (isPureObject(newValue)) {
        observe(newValue)
      }
    },
    get() {
      if (scope.watcher) {
        console.log('bind watcher');
        console.log(key);
        dep.bindWatcher(scope.watcher)
      }
      return value
    }
  })
}

function Vue(options) {
  if (!(this instanceof Vue)) {
    return new Vue(options)
  }
  this.data = options.data
  // 监听vue.data
  observe(this, options.data)
  // computed
  initComputed(this, options.computed)

  // 执行mounted函数
  if (options.mounted) {
    options.mounted.call(this)
  }
}

module.exports = Vue
