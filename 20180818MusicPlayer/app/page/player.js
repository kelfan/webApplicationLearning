import React from "react";
import Progress from '../components/progress'

let duration = null;
let Player = React.createClass({
    getInitialState: function () {
        return {
            progress: '-'
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
            <div>
                <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler}
                    barColor="#ff0000"
                ></Progress>
            </div>
        )
    }

});

export default Player;