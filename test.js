const Vue = require('./observe')


Vue({
  data: {
    name: 'bibidu',
    age: 12
  },
  computed: {
    compose() {
      console.log('aa');
      return this.name + ' ' + this.age
    }
  },
  mounted() {
    console.log('mounted');
    console.log(this.compose);
    this.name = 'UPDATED NAME'
    this.age = 23
    console.log(this.compose);
  }
})
