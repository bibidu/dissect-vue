# dissect-vue

<!-- 绑定的watcher 再次执行时绑定最新的Vue作用域 (添加watcher时绑定vm，由于浅拷贝的原因数据改变可直接获取到)-->
<!-- 每次获取computed的值时都是重新执行computed还是直接取缓存 (每次computed依赖的值变化即执行更新computed值，手动获取computed时直接取，无需重复执行)-->
<!-- 绑定watcher时，对scope.watcher设置并失效的时机 (当前精确的属性[如嵌套属性]获取前添加，绑定完成后移除) -->
<!-- 诸如obj.a.b的watch在获取值前需获取obj/obj.a,可能会提前把scope.watcher消费掉 (对象嵌套形式进行深度优先遍历)-->