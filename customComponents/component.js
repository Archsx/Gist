import util from './util.js'

export default class Component{
  constructor(props){
    this.props = props
  }
  setState(newState){
    let oldDOM = this.el
    this.state = Object.assign({},this.state,newState)
    this.renderDOM()
    if(this.onStateChange) {
      this.onStateChange(oldDOM,this.el)
    }
  }
  renderDOM(){
    this.el = util.createDOMFromString(this.render())
    if(this.handleClick){
      this.el.addEventListener('click',this.handleClick.bind(this))
    }
    return this.el
  }
}