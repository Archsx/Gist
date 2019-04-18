export default {
  addItem(context,payload){
    console.log(context)
    context.commit('addItem',payload)
  },
  clearItem(context,payload){
    context.commit('clearItem',payload)
  }
}