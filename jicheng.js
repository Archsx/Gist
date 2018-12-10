// function Animal(sex){
//   this.sex = sex
// }
// Animal.prototype.eat = function(){
//   console.log('eat')
// }

// function Person(name){
//   this.name  = name
// }
// Person.prototype.greet = function(){
//   console.log('greet')
// }

// let me = new Person('sx')
/**
 * me.eat()?
 * 
 */
//me.eat() TypeError: me.eat is not a function

// let Fn = function(){}
// Fn.prototype = Animal.prototype
// Person.prototype = new Fn()
// let me = new Person('sx')
// console.log(me.__proto__.__proto__ === Animal.prototype)
// me.greet ()



// function Person(name){
  // this.name = name
// }
// Person.prototype.sayHi = function(){
  // console.log(`Hi + ${this.name}`)
// }
// var frank = new Person('frank')
// frank.sayHi()
// 
// 
// function Animal(kind){
  // this.kind = kind
// }
// Animal.prototype.run = function(){
  // console.log('running')
// }
// var animal = new Animal('people')

// 这里就有差异了，视频中的写法，和这里不同的地方就是顺序！
//这个很重要毕竟牵扯到了赋值


function Animal(kind){
  this.kind = kind
}
Animal.prototype.run = function(){
  console.log('running')
}

function Person(name){
  Animal.call(this,'human')
  this.name = name
}
//第一种方式：直接赋值，注意下面这句话写在sayHi方法的前面和后面都行。但是其他的方式可能就要注意下顺序了
// Person.prototype.__proto__ = Animal.prototype

//方式二：Object.create,注意观察下这个形式，并没有出现__proto__
//但是这个要注意顺序，必须写在sayHi方法的前面，毕竟这是个赋值，假如写在sayHi方法的后面,那么相当于prototype都被指向到另外的对象了，也就没有了sayHi方法了

// Person.prototype = Object.create(Animal.prototype)

//方式三：最接近正规的方法
//Person.prototype = new Animal()
//这句其实也是实现Person.prototype.__proto__ === Animal.prototype
//形式上，感觉有点怪，但是要明白是怎么回事，就是new的作用
//顺序也要放在sayHi方法的前面，这需要注意,原因和上面类似，毕竟这也是赋值
//注意这里其实也就是赋值，毕竟this的使用最后一条，new 一个构造函数的时候
//这里的this指向的是那个实例
//如下的代码所示，假如我们传上这个‘test’参数，也要经历Animal这个构造函数
//也就是说其实也经历了Person.prototype.kind = 'test'这一过程
//console.log(Person.prototype.kind)也会印证这一结果
//其实我们就是想要Person.prototype.__proto__ = Animal.prototype这一结果
//只是借用了new能够绑定原型这一技巧
//这样也可能会带来如下所示的副作用，Person.prototype可能会有新的属性kind
// Person.prototype = new Animal('test')


//最完美的答案，声明一个中间函数

function Fn(){}
Fn.prototype = Animal.prototype
Person.prototype = new Fn()

Person.prototype.sayHi = function(){
  console.log(`hi I am ${this.name}`)
}
// Person.prototype.__proto__ = Animal.prototype //由此可见，这个__proto__的关系才是关键
var frank = new Person('frank')
frank.run()
frank.sayHi()
console.log(Person.prototype.kind)





/**
 * ES2015 继承
 */


 class Animal{
   constructor(kind){
     this.kind = kind
   }
   run(){
     console.log('running')
   }
 }

class Person extends Animal{ //就这么一个关键字extends就实现了继承原型链，比上面的方式4是不是简洁多了
  constructor(kind,name){
    super(kind) // 这一句实现的是上面的Animal.call(this,kind)这样的功能，简直是太简介了
    this.name = name
  }
  get lang(){
    return 'chinese' //模拟设置Person.prototype.lang，这个不是继承Animal的
                    //这只是模拟！！！
  }
  sayHi(){
    console.log(`hi i am ${this.name}`)
  }
}
var me = new Person('human','sb')
console.log(Person.prototype.lang)
me.run()
me.sayHi()







function MyMath(){}
MyMath.prototype = Math
var m = new MyMath()
console.log(m.random())



