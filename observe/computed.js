const scope = require('./scope')

function initComputed(vm, computed) {
  Object.keys(computed).forEach(key => {
    // 由于执行computed时会触发其中依赖的data，
    // 所以通过提前绑定该computed到scope.watcher来实现 当数据变更新可以重新执行该computed
    scope.watcher = function() {
      vm[key] = computed[key].call(vm)
    }
    // 立即执行computed来绑定 数据和computed的关系
    vm[key] = computed[key].call(vm)
    // 对于每一个computed，执行结束后才可将watcher置空，
    // 因为computed可能依赖多个data，可理解为多个data中任意一个发生变化，该computed的值都需要重新计算
    scope.watcher = null
  })
}

module.exports = initComputed

