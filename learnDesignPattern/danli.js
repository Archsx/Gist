var Singleton = function(name){
  this.name = name
  // this.instance = null 这一行似乎要不要都一样
}
Singleton.prototype.getName = function(){
  console.log(this.name)
}
Singleton.getInstance = function(name){
  if(!this.instance){
    this.instance = new Singleton(name)
  }
  return this.instance
}

var a = Singleton.getInstance('a')
var b = Singleton.getInstance('b')
//如代码所示 这里确实只有一个实例，这个实例被绑定在了Singleton的自身的属性instance上面了
b.getName()//a
console.log(b.name)//a


class Singleton{
  constructor(name){
    this.name = name
  }
  static getInstance(name){
    if(!this.instance){
      this.instance = new Singleton(name)
    }
    return this.instance
  }
  getName(){
    return this.name
  }
}

Singleton.instance = null //ES6好像确实没有提供给构造函数绑定属性的语法。。
var a = Singleton.getInstance('a')
var b = Singleton.getInstance('b')
console.log(b.getName())//a
console.log(b.name)//a


