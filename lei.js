function Soldier(id){
  this.id  = id
}

Soldier.prototype.run = function(){
  console.log('run')
}

var s1 = new Soldier(1)


class Soldier{
  constructor(id){
    this.id = id
  }//notice:这里不需要逗号，虽然这个class的写法很像一个对象，但是对象的话这里该写逗号，而假如是css的话这里该是分号，但是这里却是什么都不加
  get sort(){
    return "美国大兵"
  } //这里对应的是Soldier.prototype = {sort:'美国大兵'}这样的情况，即如何定义公有的属性
  static xxx(){

  } //这里对应的是Soldier.xxx = function(){}这样的写法，即调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法
  run(){
    console.log('run')
  }
}

//typeof Soldier //"function"


