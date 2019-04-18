export default {

  /**
   * 
   * @param {string} str
   * return DOM 
   */  
  createDOMFromString(str){
    let div = document.createElement('div')
    div.innerHTML = str
    return div
  },

  /**
   * to do
   */

  mount(wrapper,componentInstance){
    componentInstance.onStateChange = function(oldDOM,newDOM){
      wrapper.insertBefore(newDOM,oldDOM)
      wrapper.removeChild(oldDOM)
    }
    wrapper.appendChild(componentInstance.renderDOM())
  }














}