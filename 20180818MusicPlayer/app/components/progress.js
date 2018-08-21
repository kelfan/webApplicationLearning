import React from 'react'
import './progress.less'

let Progress = React.createClass({
  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    // console.log(progress);
    // It is safer to check whehter it is exists and then use it 
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }, 
  render(){
    return (
      <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress" style={{width: `${this.props.progress}%`}} ></div>
      </div>
    );
  }
});

export default Progress; 
 