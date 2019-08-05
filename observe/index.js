const Dep = require('./dep')
const scope = require('./scope')
const initComputed = require('./computed')
const initWatch = require('./watch')
const {
  isPureObject
} = require('../utils')

function observe(vm, obj) {
  console.log('observe');
  console.log(obj);
  if (!isPureObject(obj)) {
    return `无需监听非object类型的值`
  }
  Object.keys(obj).forEach(key => {
    defineDirective(vm, key, obj[key])
  })
}

function defineDirective(obj, key, value) {
  // 嵌套对象类型 深度优先遍历(广度优先也可以)
  // 重点是 对内层属性都需要递归进行监听
  // 根部的observe 第一个参数应是this/vm, 其他keys应绑定在对应的object上，故传递的第一个参数和第二个相同，具体参见observe函数的实现
  observe(value, value)
  // let value = obj[key]                                                                                                                                                                                                                                                                                                                                  
  // 对于每个value都创建一个Dep实例，用于：
  // 1.更新数据时，通知 依赖项
  // 2.获取数据时，绑定 依赖项
  let dep = new Dep()
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
        dep.bindWatcher(scope.watcher)
      }
      return value
    }
  })
}
// function dataProxy(vm, obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
//     Object.defineProperty(vm, key, {
//       get() {
//         console.log('get');
//         return value
//       },
//       set(newV) {
//         val = newV
//       }
//     })
//   })
// }
function Vue(options) {
  if (!(this instanceof Vue)) {
    return new Vue(options)
  }
  this.data = options.data
  // data proxy
  // dataProxy(this, options.data)
  // 监听vue.data
  observe(this, options.data)
  // computed
  initComputed(this, options.computed || {})
  // watch
  initWatch(this, options.watch || {})

  // 执行mounted函数
  if (options.mounted) {
    options.mounted.call(this)
  }
}

module.exports = Vue
