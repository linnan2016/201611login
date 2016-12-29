let Board = React.createClass({
    getInitialState(){
        return {Msgs: []};
    },
    handleClick(){
        var value=this.refs.myTxt.value;
        this.setState({Msgs: this.state.Msgs.concat(value)});
        this.refs.myTxt.value='';
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.Msgs.map((item, index) => {
                                return <li key={index}
                                           className={"list-group-item"}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text" className="form-control" ref="myTxt"/>
                    <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));