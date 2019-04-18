import store from './store/index.js'


import Count from './components/count.js'
import List from './components/list.js'
//暂时不用这个status.js
// import Status from './components/status.js'



// const formElement = document.querySelector('.js-form')
// const inputElement = document.querySelector('#new-item-field')
const inputElement = document.querySelector('#addIpt')
const btn = document.querySelector('.addBtn')
// formElement.addEventListener('submit',evt=>{
btn.addEventListener('click',evt => {
  evt.preventDefault()
  let value = inputElement.value.trim()

  if(value.length){
    store.dispatch('addItem',value)
    inputElement.value = '';
    inputElement.focus()
  }



})

  const countInstance = new Count();
  const listInstance = new List()
  // const statusInstance = new Status()

  countInstance.render()
  listInstance.render()
  // statusInstance.render()


/**
 * 试试proxy，下面的代码和上面的主题无关
 */


// var obj = {
//   name:{
//     first:'xun'
//   }
// }
// var foo = new Proxy(obj,{
//   set(target,key,value){
//     return false
//     console.log('aaa')
//   }
// })

// foo.name = 'sb'
// console.log(obj.name) //{first:'su'}



// obj.name = 'sb' 
// console.log(obj.name) // sb


