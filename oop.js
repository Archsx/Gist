const bread = {name:'Bread',price:1}
const water = {name:'Water',price:0.25}

const basket = []
basket.push(bread)
basket.push(bread)
basket.push(water)
basket.push(water)
basket.push(water)


const total = basket.map(ele=>ele.price).reduce((a,b)=>a+b)
console.log(total)



class Product{
  constructor(name,price){
    this.name = name
    this.price = price
  }
  getName(){
    return this.name
  }
  getPrice(){
    return this.price
  }
}

class Basket{
  constructor(){
    this.products = []
  }
  addProduct(amount,product){
    
  }
}