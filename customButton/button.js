import Component from './component.js'


export default class Button extends Component{
    constructor(element){
        super(element)
        this.state = {
            isLiked:false
        }
        this.render()
    }
    render(){
        this.el.innerHTML =  `
            <button class="like-btn">
                <span class="like-text">
                    ${this.state.isLiked ? '取消':'点赞'}
                </span>
            </button>       
        `
        this.el.querySelector('.like-btn').addEventListener('click',this.changeText.bind(this))
    }
    changeText(){
        this.setState({
            isLiked:!this.state.isLiked
        })
    }
}