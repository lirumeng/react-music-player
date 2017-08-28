import React from 'react';
import Header from './components/header';
import Player from './page/player';
import { MUSIC_LIST } from './config/musiclist';
import MusicList from './page/musiclist'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import PubSub from 'pubsub-js'

let App = React.createClass({
  getInitialState(){
    return {
      currentMusicItem: MUSIC_LIST[0],
      musicList: MusicList
    }
  },
  playMusic(musicItem){
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');

    this.setState({
      currentMusicItem: musicItem
    })
  },
  playNext(type="next"){
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex =null;
    let musicListLen = this.state.musicList;
    if(type === "next"){
      newIndex = (index+1)%musicListLen;
    }else{
      newIndex = (index-1+musicListLen)%musicListLen;
    }
    this.playMusic(this.state.musicList[newIndex]);
  },
  findMusicIndex(musicItem){
    return this.state.musicList.indexOf(musicItem);
  },
  componentDidMount(){
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    $('#player').bind($.jPlayer.event.ended,(e)=>{
      this.playNext();
    });
    this.playMusic(this.state.currentMusicItem);
    PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item != musicItem;
        })
      });
    });
    PubSub.subscribe('PLAY_PREV', () => {
      this.playNext('prev');
    });
    PubSub.subscribe('PLAY_NEXT', () => {
      this.playNext();
    });
  },
  componentWillUnMount(){
    PubSub.unsubscribe('PLAY_MUSIC');
    PubSub.unsubscribe('DELETE_MUSIC');
    PubSub.unsubscribe('PLAY_PREV');
    PubSub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended);
  },
  render(){
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }
});

let Root = React.createClass({
  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player}></IndexRoute>
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    )
  }
});

export default Root;
