import React from 'react';

class TodoList extends React.Component {
    handleBtnClick(){
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
                    <li>learn react</li>
                    <li>learn react</li>
                </ul>
            </div>
        );
    }
}

export default TodoList;
