import React from 'react'
import './hello.less'

let Hello = React.createClass({
  render() {
    return(
      <div className='hello-component'>
        Hello, React World
      </div>
    );
  }
});

export default Hello;
