import React from 'react';

class TodoItem extends React.Component {


    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        // const {delete1, index} = this.props;
        // delete1(index);
        this.props.delete(this.props.index);
        // console.log(this.props.index)
    };

    render() {
        const {content} = this.props;
        return (
            <div onClick={this.handleDelete}>{content}</div>
        )
    }
}

export default TodoItem;