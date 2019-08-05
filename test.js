const Vue = require('./observe')


Vue({
  data: {
    name: 'bibidu',
    age: 12,
    address: {
      home: '大兴区',
      company: '朝阳区'
    }
  },
  computed: {
  },
  watch: {
    'address.home'(newV, oldV) {
      console.log(`监听到address.home变化 从${JSON.stringify(oldV)} ---> ${JSON.stringify(newV)}`);
    },
    age(newV, oldV) {
      console.log(`监听到age变化 从${oldV} ---> ${newV}`);
    }
  },
  mounted() {
    console.log('mounted');
    // console.log(this.address.home);
    this.age = 34
    this.address.home = '房山区'
    this.address = 'some string'
    // 在Vue中，添加对象不存在的属性需要使用$set进行添加以进行数据监听，直接设置watch无法获取数据变化。此处暂不实现$set
    this.address.home = 123
    this.address.home = 456
  }
})
