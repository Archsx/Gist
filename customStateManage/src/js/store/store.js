import PubSub from "../lib/pubsub.js";

//好像网上说，这个其实也就是一个全局变量

export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";
    //这里把发布订阅模式的一个实例挂在了self的evetnts属性上，但是要注意，其实是self.events.events = {}
    self.events = new PubSub();

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }
    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }
    //注意，这里没有像上面那样检测params是否有state属性，
    //然后把prams.state赋予self.state
    //而是创建了一个新的代理对象，用来代理params.state(如果不存在的话则代理空对象)
    //因为我们是要监听对属性的赋值，代理之后操作self.state也就是操作params.state了
    //代理会将所有应用到它的操作转发到这个对象上(MDN),也就是我们直接操作self.state而不是params.state
    self.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        //这里是说对于self.state的属性赋值时，执行赋值
        state[key] = value;
        console.log(`stateChange:${key}:${value}`);
        //对于每次赋值，PubSub实例都会发布事件，同时把新的state作为参数传出去
        self.events.publish("stateChange", self.state);
        //
        if (self.status !== "mutation") {
          console.warn("You should use amutation to set ${key}");
        }
        //之前发布了事件，其实会把那些callback执行一遍，在set之后就是空闲/休息状态了
        self.status = "resting";

        //不明白为什么
        return true;
      }
    });
  }
  //总结 修改self.state ---因为设置了代理的handler的set trap
  //--->触发了set函数 --->更新self.state的值 --->self.events发布stateChange事件(感觉这点很重要)
  //--->self.events['stateChange']里面的callbacks依次作用于self.state

  //接下来要写的是dispatch,还记得vue里面仿佛是这样使用的:this.$store.dispatch('xxx',payload)
  dispatch(actionKey, payload) {
    let self = this;
    // 这是为了炫技?为了检测一个对象是否有某个属性，需要这样做？上面的hasOwnProperty不好吗？
    // 哦，我好像知道他为什么要这样做了，这样才能保证actions[action]是一个函数！
    //但是还有更好的方法，我觉得是Object.prototype.toString.call()
    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action ${actionKey} doesn't exist`);
      return false;
    }
    //这里的提示有点鸡肋 我也不知道为什么要console出action
    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = "action";

    //这才到了执行,但是需要注意的是，这里写了两个参数，第一个参数为self
    //这就意味着以后自己定义action的时候，需要把第一个参数设为context(this指向)
    //写成这样的形式会不会更好一点？self.actions[acionKey].bind(self)(payload)
    self.actions[actionKey](self, payload);

    //和上面的console.groupCollapsed遥相呼应
    console.groupEnd();

    return true;
  }
  //注意，我们这里定义的是disptach,而工作中因为有vuex帮我们定义了dispatch，
  //我们其实只是写了一些action,我们在某个函数中调用this.$store,dispatch('xxx',payload)
  //然后自己定义好action,又在action中调用commit，
  //有时候我们不用调用action，直接在函数中this.$store.commit('xxx',payload)
  //所以其实哦我们在工作中只是在写action 和 mutation
  //vuex定义了dispatch和commit

  //接下来是写commit,commit和上面的dispatch很像

  commit(mutationName, payload) {
    let self = this;

    if (typeof self.mutations[mutationName] !== "function") {
      console.error(`Mutation ${mutationName} doesn't exist `);
      return false;
    }
    //不知道为什么这里没有console.groupCollapsed
    //console.groupCollapsed(`Mutation :${mutationName}`)

    self.status = "mutation";

    //   为什么没有采用下面的写法呢？是我把它想得太简单了,完全照搬上面的写法
    // 因为上面的dispatch所对应的是action，这时候其实更多的是对应的是业务逻辑
    //比如某些ajax请求，这时候更多的是需要那个payload,感觉那个actions[actionName](self,payload)这里的self的作用不大
    //    self.mutations[mutationName](self,payload)
    //而这里则不同，commit所针对的是mutation,commit的mutation的第一个参数往往是state
    //因为在mutation里面就完成了state的修改
    //这里和Vuex里面的实现可能不同，vuex里面的mutation可能是state +=1,并没有return
    //而下面的写法可能就需要在mutation里面明确的return了
    //并且！！！ 要注意，下里就对state进行了修改,
    //那就会触发之前的state的proxy里面所对应的stateChange事件！
    //进而调用PubSub里面的stateChange所对应的回调函数
    //然后完成UI的更新(这句是猜测)
    let newState = self.mutations[mutationName](self.state,payload)
    self.state = Object.assign(self.state,newState)

    //Object,assign 啧啧




    //    console.groupEnd()

    return true;
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
