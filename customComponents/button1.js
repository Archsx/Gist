import Component from './component.js'

export default class Button extends Component{
  constructor(){
    super()
    this.state = {
      isLiked:false
    }
  }
  render() {
    return `
      <button class="like-btn">
        <span class='like-text'>
          ${this.state.isLiked ? '取消':'点赞'}
        </span>
      </button>
    ` 
  }
  handleClick(){
    this.setState({
      isLiked:!this.state.isLiked
    })
  }
}