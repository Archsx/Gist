export default {
  addItems(context,payload){
    context.commit('addItem',payload)
  },
  clearItems(context,payload){
    context.commit('clearItem',payload)
  }
}