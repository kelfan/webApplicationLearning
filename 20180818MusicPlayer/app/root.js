import React from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'

let Root = React.createClass({
  getInitialState: function () {
    return {
      musicList: MUSIC_LIST,
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
        <MusicList
          currentMusicItem={this.state.currentMusicItem}
          musicList={this.state.musicList} 
        ></MusicList>
      </div>
    )
  }
});

export default Root;
