class App extends React.Component{

    render(){
        return (
            <div>
                <p>{this.props.num}</p>
                <button onClick={this.props.add}>add</button>
                <button onClick={this.props.remove}>remove</button>
                <button onClick={this.props.addAsync}>addAsync</button>
                <button onClick={this.props.addTwice}>addTwice</button>
            </div>
        )
    }
}


App=connect(
    state=>({
        num:state
    }),
    {
        add,
        remove,
        addAsync,
        addTwice
    }
)(App)