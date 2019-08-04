const observe = require('./observe')

let obj = {
  name: 'bibidu',
  age: 12
}

observe(obj)


console.log(obj.name);

obj.name = {
  home: 'xiaodu',
  school: 'bibidu'
}

console.log(obj.name);
console.log(obj.name.home);
