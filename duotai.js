var makeSound = function(animal){
  if(animal instanceof Duck){
    console.log('gagaga')
  }else if(animal instanceof Cat){
    console.log('miaomaioamiao')
  }
}
function Duck(){

}
function Cat(){

}
var duck = new Duck()
var cat = new Cat()
makeSound(duck)



var makeSound = function(animal){
  animal.sound()  
}
var Duck = function(){

}
Duck.prototype.sound = function(){
  console.log('gagaga')
}
var Cat = function(){

}
Cat.prototype.sound = function(){
  console.log('miaomiaomiao')
}
makeSound(new Cat())