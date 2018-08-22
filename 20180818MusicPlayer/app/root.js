import React from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { Router, IndexRoute, Link, Route, hashHistory } from "react-router";
import Pubsub from 'pubsub-js'


let App = React.createClass({
  getInitialState: function () {
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  },
  playMusic(musicItem){
      $('#player').jPlayer('setMedia', {
        mp3: musicItem.file 
      }).jPlayer('play');

      this.setState({
        currentMusicItem:musicItem
      }); 
  },
  componentDidMount: function () {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList:this.state.musicList.filter(item => {
          return item !== musicItem 
        })
      });
    });
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
  },
  componentWillUnmount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
  },
  render() {
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }
});

let Root = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player}></IndexRoute>
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    );
  }
});

export default Root;
