import React from 'react';

class TodoList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            list: [
                'learn react',
                'learn English',
                'learn vue'
            ]
        }
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, 'hello world']
        });
        // this.state.list.push('hello world') -> cannot refresh the list
    };

    render() {
        return (
            <div>
                <div>
                    <input/>
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
