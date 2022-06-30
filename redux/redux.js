const createStore=(reducer,enhancer)=>{
    if(enhancer){
        return enhancer(createStore)(reducer)
    }

    let state
    let listeners=[]

    const getState=()=>state
    const subscribe=(listener)=>{
        listeners.push(listener)
        return ()=>listeners=listeners.filter(l=>l!==listener)
    }
    const dispatch=(action)=>{
        state=reducer(state,action)
        listeners.forEach(l=>l())
    }
    dispatch({})


    return {
        getState,
        subscribe,
        dispatch
    }
}



const compose=(...funcs)=>{
    return funcs.reduce((accFunc,currFunc)=>(...args)=>accFunc(currFunc(...args)))
}

const fn1=(state)=>{console.log('fn1',state); return state+1}
const fn2=(state)=>{console.log('fn2',state); return state+2}
const fn3=(state)=>{console.log('fn3',state); return state+3}
const fn4=(state)=>{console.log('fn4',state); return state+4}

compose(fn1,fn2,fn3,fn4)

[fn1,fn2,fn3,fn4].reduce((accFunc,currFunc)=>(...args)=>accFunc(currFunc(...args)))

let index=1
accFunc=fn1

while(index<4){
    accFunc=combiner(accFunc,funcs[index])
    index++
}


combiner(fn1,fn2)

acc1=(...args)=>fn1(fn2(...args))


combiner(acc1,fn3)

acc2=(...args)=>acc1(fn3(...args))


combiner(acc2,fn4)

acc3=(...args)=>acc2(fn4(...args))



const thunk=({dispatch,getState})=>{
    return (next)=>{
        return (action)=>{
            if(typeof action === 'function'){
                return action(dispatch,getState)
            }
            return next(action)
        }
    }

}



const arrayThunk=({dispatch,getState})=>{
    return (next)=>{
        return (action)=>{
            if(Array.isArray(action)){
                return action.forEach(a=>dispatch(a))
            }
            return next(action)
        }
    }
}

const applyMiddleware=(...middlewares)=>{
    return (createStore)=>{
        return (...args)=>{
            const store=createStore(...args)
            let dispatch=store.dispatch
            const midApi={
                getState:store.getState,
                dispatch:(...args)=>dispatch(...args)
            }

            const middlewareChain=middlewares.map(middleware=>middleware(midApi))
            dispatch=compose(...middlewareChain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


const bindActionCreator=(creator,dispatch)=>{
    return (...args)=>dispatch(creator(...args))
}

const bindActionCreators=(creators,dispatch)=>{
    return Object.keys(creators).reduce((acc,curr)=>{
        acc[curr]=bindActionCreator(creators[curr],dispatch)
        return acc
    },{})
}

const combineReducers=(reducers)=>{
    return (state={},action) =>{
        return Object.keys(reducers).reduce((acc,curr)=>{
            acc[curr]=reducers[curr](state[curr],action)
            return acc
        },{})
    }
}










const counter=(state=0,action)=>{
    switch(action.type){
        case 'ADD':
            return state + 1
        case 'DECREASE':
            return state -1 
        default:
            return state
    }
}

const store=createStore(counter)




const ADD='ADD'
const REMOVE='REMOVE'

const add=()=>{
    return {
        type:ADD
    }
}

const remove=()=>{
    return {
        type:REMOVE
    }
}


const addAsync=()=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(add())
        },2000)
    }
}


const addTwice=()=>{
    return [
        {type:ADD},
        addAsync()
    ]
}