/**
 * 我觉得这里很神奇，有时候我们只会导出一个对象，然后利用这个对象作为中心，而这里则是导出了一个类
 * 这个类的每一个实例都可以实现发布订阅模式
 */
// export default class PubSub{
//   constructor(){
//     this.events = {}
//   }
//   subscribe(eventName,fn){
//     this.events[eventName] = this.events[eventName] ? this.events[eventName] : []
//     this.events[eventName].push(fn)
//   }
//   publish(eventName,payload){
//     if(this.events[eventName]){
//       this.events[eventName].forEach(fn => {
//           fn(payload)
//       });
//     }
//   }
// }



/**
 * 下面是文章中给的写法 判断一个对象有没有一个属性需要这么麻烦吗？不过似乎以前在hive的时候就是这样的
 */

export default class PubSub{
  constructor(){
    this.events = {}
  }
  subscribe(eventName,fn){
    let self = this
    if(!self.events.hasOwnProperty(eventName)){
      self.events[eventName] =[]
    }
    //注意，这里为什么要加return呢？因为push的返回值是这个数组目前的长度，文章说返回这个长度可以清楚的知道一个事件数组有多少函数
    return self.events[eventName].push(fn)
  }
  publish(eventName,data={}){
    let self = this
    //这里也不明白，为什么假如先publish(即events[eventName]为undefined)的话，为什么要返回一个空数组啊
    if(!self.events.hasOwnProperty(eventName)){
      return []
    }
    //这里可能还能想得通，返回的是一个fn函数作用于data后的结果的数组
    return self.events[eventName].map(fn=>fn(data))
  }
}