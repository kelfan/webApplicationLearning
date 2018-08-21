import React from "react";
import Progress from '../components/progress'
import './player.less'
import { Link } from 'react-router';

let duration = null;
let Player = React.createClass({
    getInitialState: function () {
        return {
            progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: ''
        };
    },
    componentDidMount() {
        // bind the play progress to a recall function (refresh the state of the component)
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    },
    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    },
    progressChangeHandler(progress) {
        // console.log('root', progress);
        $('#player').jPlayer('play', duration * progress);
    },
    render() {
        return (
            <div className="player-page">
            <h1 className="caption"><Link to="/list">My Music Player &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">left time</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                            <div className="volume-wrapper">
                                volume control part 
                            </div>
                        </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px'}}>
                        play progress part 
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev"></i>
                            <i className='icon ml20 play'></i>
                            <i className="icon next ml20"></i>
                        </div>
                        <div className="-col-auto">
                            <i className='icon repeat-cycle' ></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.artist}/>
                </div>
            </div>
        </div>
        )
    }

});

export default Player;