import Component from '../lib/component.js'
import store from '../store/index.js'



export default class List extends Component{
  constructor(){
    super({
      store,
      // element:document.querySelector('.js-items')
      element:document.querySelector('.ul-wrapper')
    })
  }

  render(){
    let self = this
    if(store.state.items.length === 0){
      //如何变换DOM，不要小看下面的方法，直接对innerHTML属性赋值，这样就直接改变了DOM结构
      //同时也是将字符串转化为dom元素的桥梁，
      //思考之前学习的react入门文章里面createdDOMFromString这个方法,同样也是采用了这个方法，
      //只不过在那个方法中，我们又自己定义了一个mount方法进行oldDOM和newDOM的更替（删除就节点，插入新节点），
      //而现在的方法是直接绑定一个节点，更改这个节点的innerHTML,我感觉这样的方式更接近于VUE,也许Reac采用的是之前那个吧
      self.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`
      return
    }
    //下面通过模板字符串的方法动态生成字符串也很有意思
  self.element.innerHTML = ` 
  <ul class="app_items">
    ${store.state.items.map(item => {
      return `
        <li>${item}<button aria-label="Delete this item">X</button></li>
      
      `
    }).join('')}
  </ul>
  `

  //同样是在render里面进行的事件绑定
  self.element.querySelectorAll('button').forEach((button,index) => {
    button.addEventListener('click',()=>{
      store.dispatch('clearItem',{index})
    })
  });
  }
}