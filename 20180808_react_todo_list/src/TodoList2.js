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
        alert('hello')
    };

    render() {
        return (
            <div>
                <div>
                    <input/>
                    <button onClick={this.handleBtnClick}>add</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item) => {
                            return <li>{item}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;
