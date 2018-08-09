import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputValue: ''
        }
    }

    handleInputChange(e) {
        // console.log(e.target.value)
        this.setState({
            inputValue: e.target.value
        })
    };

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });
        // this.state.list.push('hello world') -> cannot refresh the list
    };

    render() {
        return (
            <div>
                <div>
                    {/*value=means bind the value to the element*/}
                    <input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>
                    <button onClick={this.handleBtnClick.bind(this)}>add</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;
