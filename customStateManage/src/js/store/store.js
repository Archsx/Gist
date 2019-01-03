import PubSub from '../lib/pubsub.js'



//好像网上说，这个其实也就是一个全局变量

export default class Store {
  constructor(params){
    let self = this
    self.actions = {}
    self.mutations = {}
    self.state = {}
    self.status = 'resting'
    //这里把发布订阅模式的一个实例挂在了self的evetnts属性上，但是要注意，其实是self.events.events = {}
    self.events = new PubSub()


    if(params.hasOwnProperty('actions')){
      self.actions = params.actions
    }
    if(params.hasOwnProperty('mutations')){
      self.mutations = params.mutations
    }
    //注意，这里没有像上面那样检测params是否有state属性，
    //然后把prams.state赋予self.state
    //而是创建了一个新的代理对象，用来代理params.state(如果不存在的话则代理空对象)
    //因为我们是要监听对属性的赋值，代理之后操作self.state也就是操作params.state了
    //代理会将所有应用到它的操作转发到这个对象上(MDN),也就是我们直接操作self.state而不是params.state
    self.state = new Proxy((params.state || {}),{
      set:function(state,key,value){
        //这里是说对于self.state的属性赋值时，执行赋值
        state[key] = value
        console.log(`stateChange:${key}:${value}`)
        //对于每次赋值，PubSub实例都会发布事件，同时把新的state作为参数传出去
        self.events.publish('stateChange',self.state)
        //
        if(self.status !== 'mutation'){
          console.warn('You should use amutation to set ${key}')
        }
        //之前发布了事件，其实会把那些callback执行一遍，在set之后就是空闲/休息状态了
        self.status = 'resting'


        //不明白为什么
        return true 
      }
    })
  }
}









//下面是我背着写的：


// export default class Store{
//   constructor(params){
//     let self = this
//     self.state = {}
//     self.actions = {}
//     self.mutations = {}
//     self.status = 'resting'
//     self.events = new PubSub()


//     if(params.hasOwnProperty('actions')){
//       self.actions = params.actions
//     }
//     if(params.hasOwnProperty('mutations')){
//       self.mutations = params.mutations
//     }


//     self.state = new Proxy((params.state || {}),{
//       set(state,key,value){
//         state[key] = value
//         console.log(`changingState:${key}:${value}`)
//         self.events.publish('stateChange',self.state)
//         if(self.status !== 'mutation'){
//           console.warn('You shound use mutaion')
//         }
//         self.status ='resting'
//         return true
//       }
//     })    

//   }
// }