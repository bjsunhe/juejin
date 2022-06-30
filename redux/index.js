const store=createStore(counter,applyMiddleware(thunk,arrayThunk))
ReactDOM.render(
    (<Provider store={sotre}>
        <App />
    </Provider>),
    document.getElementById("root")
)