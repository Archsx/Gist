
//看到这里的时候其实我觉得糊里糊涂的，不明白这个有什么用 先往下看吧

import Store from '../store/store.js'

export default class Component {
  constructor(props = {}){
    let self = this
    this.render = this.render || function(){}
    if(props.store instanceof Store){
      //因为此时相当于props.store.evetns = new SubPub
      //由于三个组件都引用了同一个store,在这个先订阅了这个事件，
      //当store.state的属性值发生变化时(触发peoxy里面的handler里面的set，发布stateChange事件)各个组件重新render，UI便发生了变化
      //之前的代码是在mount函数中定义了onStateChange属性，在setNewState的时候便触发这个属性，替换新旧dom
      props.store.events.subscribe('stateChange',()=> self.render())//记住这里要加括号！！！错了两次了
    }
    //下面这一点也很有意思，通过这一段实现了dom元素的绑定，而这个方法是每个组件所必须的，所以就提升到父类里面来了
    if(props.hasOwnProperty('element')){
      //this指向的是子组件（其实就是一个实例），props是从子组件super({})传进来的
      this.element = props.element
    }
  }
}