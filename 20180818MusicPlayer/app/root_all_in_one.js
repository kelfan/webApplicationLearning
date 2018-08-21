// previous version of root.js before separate functions

import React from 'react';
import Header from './components/header'
import Progress from './components/progress'

let duration = null;
let Root = React.createClass({
  getInitialState: function() {
    return {
      progress: '-'
    }; 
  },
  componentDidMount: function() {
    $('#player').jPlayer({
      ready: function() {
        console.log('start');
        $(this).jPlayer('setMedia', {
          mp3: 'https://freemusicdownloads.world/wp-content/uploads/2017/05/Justin-Bieber-Sorry-PURPOSE-The-Movement.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    // bind the play progress to a recall function (refresh the state of the component)
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    });
    $('#player').bind($.jPlayer.event.play, function(event) {
      console.log('start play');
    })
  },
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },
  progressChangeHandler(progress){
    // console.log('root', progress);
    $('#player').jPlayer('play', duration * progress);
  },
  render() {
    return(
      <div>
        <Header />
        <Progress 
          progress={this.state.progress} 
          onProgressChange={this.progressChangeHandler}
          barColor="#ff0000"
        ></Progress>
      </div>
    )
  }
});

export default Root;
