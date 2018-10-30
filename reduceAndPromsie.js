let result  = [1, 2, 5].reduce(function(acc,item){
  return acc + item
},0)



// function runPromiseByQueue(myPromises) {
//   myPromises.reduce(
//     (previousPromise, nextPromise) => previousPromise.then(() => nextPromise()),
//     Promise.resolve()
//   );
// }



function runPromiseByQueue(myPromises){
  myPromises.reduce((acc,ele) => {
    return acc.then(()=>{
       return ele() //这里尤其需要注意：这里的return 要写，如果不写的话，相当于return undefined，
                    //而这样的话，then返回的加国就是一个新的resolve(undefined)的promise，
                    //而这样的话相当于createPromise三个函数依次执行，返回的结果就变成了按时间长短决定的。
                    //所以加上return之后，then返回的就是createPromise函数返回的promise对象，
                    //这时候就不是上面所说的是resolve(undefined)的promise对象了，
                    //所以createPromise函数都需要等待上一个函数返回的promise对象resolve之后才会执行
                    //关键：then返回的是一个promise对象！这个promise对象由then函数的参数函数决定，假如参数函数返回的是一个promise对象
                    //则直接返回这个promise对象，假如返回的是一个值，则类似于Promise.resolve(这个值)
    })
  },Promise.resolve())
}
const createPromise = (time, id) => () =>
new Promise(solve =>
  setTimeout(() => {
    console.log("promise", id);
    solve();
  }, time)
);

runPromiseByQueue([
createPromise(7000, 1),
createPromise(5000, 2),
createPromise(3000, 3)
]);