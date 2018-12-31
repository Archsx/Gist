import util from './util.js'


export default class {
  constructor(props = {}){
    this.props = props
    this.state = {
      isLiked:false
    }
  }
  render(){

    //创建DOM
    this.el = util.createDOMFromString(`
      <button class="${this.props.className ? this.props.className : 'like-btn'}">
        <span class='btn-text'>
          ${this.state.isLiked ? '取消':'点赞'}
        </span>
      </button>
    `)
    //监听DOM的点击事件
    this.el.addEventListener('click',this.handleClick.bind(this))
    //这点很重要，要把这个DOM元素返回出来
    return this.el
  }

  handleClick(){
    //点击事件的处理函数

    this.setState({
      isLiked:!this.state.isLiked
    })
  }

  setState(newState){
    //保存旧的DOM节点，为后文的insertBefore铺路
    let old = this.el
    //设置新的state
    this.state = Object.assign({},this.state,newState)
    //由新的state调用render函数生成新的DOM并绑定在this.el上
    this.el = this.render()
    //对于新旧DOM进行处理，简单的说就是替换DOM（添加新的，删除旧的），这几乎是每个组件必须的吧？不然生成新的DOM还有什么意义呢。这里我还没想好怎么封装
    if(this.onStateChange){
      this.onStateChange(old,this.el)
    }
  }



}