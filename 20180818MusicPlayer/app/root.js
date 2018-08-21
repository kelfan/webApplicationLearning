import React from 'react';
import Header from './components/header'
import Player from './page/player'
import { MUSIC_LIST } from './config/musiclist'

let Root = React.createClass({
  getInitialState: function () {
    return {
      currentMusicItem: MUSIC_LIST[0]
    }
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
        <Player
          currentMusicItem={this.state.currentMusicItem}></Player>
      </div>
    )
  }
});

export default Root;
