const [a,b] = [1,2]
console.log(a,b) //1,2

const {a,b} = {a:1,b:2}
console.log(a,b) //1,2

const {a,...b} = {a:1,b:2,c:3,d:4}
console.log(a,b) //1 {b:2,c:3,d:4}


const [a,b,c] = 'hello'
console.log(a,b,c) // 'h' 'e' 'l' 这样写太迷惑了 还是不要了吧


/* 
    下面的内容和解构无关，是关于函数默认参数的
*/
function foo(a=1,b=2){
    console.log(a,b)
}

foo(undefined,undefined) // 1,2这是最神奇的，假如直接传undefined的话居然是相当于没有传参，
                        // 网上说形参的默认值就是undefined
                        // 假如把foo定义为 function foo(a,b){console.log(a,b)} foo() 这时候a和b的值都为undefined


foo() //1 , 2



function bar({name="sb",age=12,sex}){
    let baz = {zk
        name,
        age,
        sex
    }
    console.log(baz) // { name: 'sx', age: 12, sex: undefined }
    console.log(JSON.stringify(baz))  // {"name":"sx","age":12}  JSON.stringify这个函数是不是很神奇？
}

bar({name:'sx'}) 



/**
 * 解构赋值也可以赋予默认值的
 * 文章说：函数参数默认值的本质，还是解构赋值 这句我不知道它是什么意思
 */

var {a=1,b=2} = {}
console.log(a,b)//1,2


/**
 * 下面这一段就是工作中所使用的 
 * function foo({page=1,amount=5,name,startDate,endDate}){}
 * foo({page:2}),此时amount默认为5
 * 当解构赋值遇到默认参数，还是感觉有点陌生
 */

var {a = 1,b = 2} = {a:'hello'}
console.log(a,b) // 'hello',2




/**
 * 下面是很常见的结构赋值的形式
 * 需要注意的是。foo函数明确定义了参数为一个对象，且没有默认值
 * 这时候如果调用的时候写作foo()则会因为解构而出现报错
 *  
 */



function foo({a,b}){
    console.log(a,b)
}
foo() //TypeError : Cannot destructure property 'a' of 'undefined' or 'null'

foo({a:1,b:2}) //1 2  相当于const {a,b} = {a:1,b:2}



/**
 * 
 * 接下来就是很常见的形式，函数默认参数和结构赋值相结合
 * 
 */


function foo({a=1,b=2}){
    console.log(a,b)
}

foo({}) // 1 , 2 等同于const {a=1,b=2} = {} //a为1,b为2 毕竟:传参就是赋值啊啊啊啊啊


/**
 * 问题来了，对于空的参数，比如初始化的函数，我们更习惯于写init(),而非init({})
 * 
 * 上面的形式明确要求了foo的参数为一个对象，而假如写作foo()的话也会报错
 * 
 * 注意需要明白{a=1,b=2}这样写的意义，这是为了foo({})这样的形式所准备的
 * 
 * 就是上面所说的const {a = 1,b = 2} = {}
 * 
 * 而写为foo()的话，相当于foo(undefined)，
 * 
 * const {a = 1 ,b = 2} = undefined    undefined可以有a属性吗？
 * 
 * var bar = undefined
 * 
 * console.log(bar.a) //can't read property 'a' of undefined
 */

/**
 * 解决办法，函数的默认参数
 * 上面已经分析过了,foo函数的参数为一个对象
 * 那么假如相对应的实参不存在或者为undefined呢？
 * 这里函数的参数只有一个，即{a,b}这个对象
 * 当写为foo()的时候，本来该穿一个对象作为实参，但是现在没有实参
 * 这里就相当于
 * 
 * const  {a:a,b:b} = {a:1,b:2}
 * 所以a和b分别为1,2
 *
 * 
 * 
 * 
/** */
function foo({a,b} = {a:1,b:2}){
    console.log(a,b)
} 
foo()

/**
 * 可是像上面那样写的话,foo({})又不行了
 * 
 * 
 * foo({})明确传了一个{}，所以这时候foo函数的参数就不是默认参数了
 *
 * 
 *
 * 
 * 这样的话相当于const {a:a,b:b} = {}
 * 
 * 
 * 
 * foo({}) //undefined undefined 
 */


 /**
  * 解决让foo()和foo({})都能使用的办法
    如下
  */

function foo({a=1,b=2}={a:1,b:2}){
    console.log(a,b)
}


// 上面的写法是我自己写的，但是完全不用这么做，下面的才是最好的写法




function foo({a=1,b=2}={}){
    console.log(a,b)
}


/*
    此时什么都没有传，foo函数的参数为一个对象，默认为{}
    此时相当于const {a=1,b=2} = {} 这里这句来源于{a=1,b=2} ={}这个表达式
    所以此时 a为1，b为2

*/

foo()//1,2



/**
 * 
 * @param {*} param0 
 * 下面的写法，由于传入了一个空对象，所以这里不会采用foo函数的默认值（虽然默认值也是一个空对象）
 * 这时任然相当于const {a=1,b=2} = {} 但是这个和上面那个是不同的，这里是赋值，等式右边的空对象来源于foo({})的{}
 */


foo({})//1,2





function foo({a=1,b=2}){
    console.log(a,b)
}
foo({a:undefined})