function $(selector){
  if(this instanceof $ === false){
    return new $(selector)
  }else{
    let array = document.querySelectorAll(selector)
    array.forEach((element,index) => {
      this[index] = array[index]
    });
  }
}
$.prototype.on = function(){
  console.log('on')
  return this
}