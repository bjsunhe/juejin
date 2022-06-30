// function coreFn(a,b,c){
//     console.log('core',a,b)
// }

// Function.prototype.before=function(beforeFn){
//     // console.log(beforeFn,this)

//     return (...args)=>{
//         console.log(args)
//         beforeFn()
//         this()
//     }
// }

// const newFn=
// coreFn.before(()=>{
//     console.log('before')
// })

// newFn(1,2,3)



function isType(type){
    return function(val){
        return Object.prototype.toString.call(val)===`[object ${type}]`
    }
}

const isString=currying(isType)('String')
const isNumber=currying(isType)('Number')

console.log(isString(123))
console.log(isString('123'))


function currying(fn){
    let args=[]
    const inner=(arg=[])=>{
        args.push(...arg)      
        return args.length>=fn.length?fn(...args):(...arg)=>inner(arg)
    }
    return inner()
}

function sum(a,b,c,d){
    return a+b+c+d
}

console.log(currying(sum)(1)(2,3)(4))