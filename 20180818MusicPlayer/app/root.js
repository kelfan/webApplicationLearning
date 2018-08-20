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
          mp3: 'http://www.jplayer.org/audio/mp3/Miaow-snip-Stirring-of-a-fool.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    console.log('bind');
    // bind the play progress to a recall function (refresh the state of the component)
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
    	// console.log('progress');
      this.setState({
        progress: Math.round(e.jPlayer.status.currentTime)
      });
    });
    $('#player').bind($.jPlayer.event.play, function(event) {
      console.log('start play');
    })
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
