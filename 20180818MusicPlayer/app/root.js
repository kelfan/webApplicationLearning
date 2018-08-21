import React from 'react';
import Header from './components/header'
import Player from './page/player'


let Root = React.createClass({
  getInitialState: function () {
    return {
    };
  },
  componentDidMount: function () {
    $('#player').jPlayer({
      ready: function () {
        console.log('start');
        $(this).jPlayer('setMedia', {
          mp3: 'https://freemusicdownloads.world/wp-content/uploads/2017/05/Justin-Bieber-Sorry-PURPOSE-The-Movement.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
  },
  componentWillUnmount() {
  },
  render() {
    return (
      <div>
        <Header />
        <Player></Player>
      </div>
    )
  }
});

export default Root;
