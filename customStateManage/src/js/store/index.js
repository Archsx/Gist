import actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'
import Store from './store.js'

// 感觉至此我们的数据部分就应该写完了 在这里导出了同一个Store对象实例
// 然后在各个模块相对应的js文件中，引入着一个对象，这样这几个js文件就有了同一个数据源
// 当修改了store对象实例的state值(mutation中)时,由于在各个模块对应的js文件中，
// 订阅了stateChange这一事件（回调函数为再次调用self.render()）
// 所以修改store对象实例的state时会发布stateChange事件,执行self.render，页面UI就会变化

const a =  new Store({
  actions,
  mutations,
  state
})
console.log(a)
export default a