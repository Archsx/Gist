export default class Component{
    constructor(prop={}){
        if(prop.element){
            this.el = prop.element
        }
    }
    setState(newState){
        this.state = Object.assign(this.state,newState)
        this.render()       
    }
}

