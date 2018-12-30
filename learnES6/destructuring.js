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
    let baz = {
        name,
        age,
        sex
    }
    console.log(baz) // { name: 'sx', age: 12, sex: undefined }
    console.log(JSON.stringify(baz))  // {"name":"sx","age":12}
}

bar({name:'sx'}) 


