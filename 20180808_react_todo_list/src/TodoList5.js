import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputValue: ''
        }
    }

    handleItemClick(index) {
        // console.log(index);
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({list})
        // this.setState({
        //     list: list
        // })
    };

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
                            return <li key={index} onClick={this.handleItemClick.bind(this, index)}>{item}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;
