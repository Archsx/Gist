var CreateDiv = function(html){
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function(){
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}


var ProxySingleletonCreateDiv = (function(){
  var instance
  return function(html){
    if(!instance){
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

var a = new ProxySingleletonCreateDiv('seven1')
var b = new ProxySingleletonCreateDiv('seven2')

a ===b 


var Singleton = function(name){
  this.name = name
}

Singleton.prototype.getName = function(){
  alert(this.name)
}

Singleton.getInstance = (function(){
  var instance = null
  return function(name){
    if(!instance){
      instance = new Singleton(name)
    }
    return instance
  }
})()


var a = Singleton.getInstance('seven1')
var b = Singleton.getInstance('seven2')
a === b //true