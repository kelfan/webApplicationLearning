import React from 'react';
import Header from './components/header'
import Progress from './components/progress'


let Root = React.createClass({
  getInitialState: function() {
    return {
      progress: '-' 
    };
  },
  // mp3: 'https://freemusicdownloads.world/wp-content/uploads/2017/05/Justin-Bieber-Sorry-PURPOSE-The-Movement.mp3'
  componentDidMount: function() {
    console.log('start');
    $('#player').jPlayer({
      ready: function() {
        console.log('start');
        $(this).jPlayer('setMedia', {
          mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
        }).jPlayer('play', 0);
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    console.log('bind');
    // bind the play progress to a recall function (refresh the state of the component)
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
    	console.log('progress');
      this.setState({
        progress: Math.round(e.jPlayer.status.currentTime)
      });
    });
  },
  render() {
    return(
      <div>
        <Header />
        <Progress progress={this.state.progress}></Progress>
      </div>
    )
  }
});

export default Root;
