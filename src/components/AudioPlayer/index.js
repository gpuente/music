import React, { Component } from 'react';
import mp from '../../helpers/player';
import tracks from '../../data';


class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks,
      song: tracks[0],
      time: {
        currentTime: {
          secs: 0,
          formatted: '00:00',
        },
        totalTime : {
          secs: 0,
          formatted: '00:00',
        },
      },
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.duration = this.duration.bind(this);
    this.handleLoadSong = this.handleLoadSong.bind(this);
    this.handleChangeSong = this.handleChangeSong.bind(this);
  }

  componentDidMount() {
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.oninput = e => mp.changeVolume(e.target.value);

    const songSlider = document.getElementById('songSlider');
    songSlider.oninput = e => mp.changeCurrentTime(e.target.value);

    mp.duration = this.duration;
    mp.onLoadSong = this.handleLoadSong;
    mp.mount();
  }

  next() {
    mp.next();
    console.log(mp.currentSong);
    this.setState({ song: mp.currentSong });
  }

  previous() {
    mp.previous();
    console.log(mp.currentSong);
    this.setState({ song: mp.currentSong });
  }

  duration(currentTime) {
    const { totalTime } = this.state.time;

    this.setState({
      time: {
        totalTime,
        currentTime,
      },
    });

    const songSlider = document.getElementById('songSlider');
    songSlider.value = currentTime.secs;
  }

  handleLoadSong(data) {
    this.setState({ time: data.time });
  }

  handleChangeSong(track) {
    this.setState({ song: track });
    mp.changeCurrentSong(track);
  }

  render() {
    const { song, tracks, time: { currentTime, totalTime } } = this.state;

    return (
      <div id="audioPlayer">

        <div id="coverContainer">
          <img src={song.cover} alt={song.album} />
        </div>

        <div id="songInfo">
          <div>Song: {song.song}</div>
          <div>Artist: {song.artist}</div>
          <div>Album: {song.album}</div>
          <div>Year: {song.year}</div>
        </div>

        <div id="controls">
          <div id="duration">
            <span id="currentTime">{ currentTime.formatted }</span>
            <input
              id="songSlider"
              type="range"
              min="0"
              max={totalTime.secs}
              defaultValue="0"
            />
            <span id="totalTime">{totalTime.formatted}</span>
          </div>
          <div id="volume">
            <span>-</span>
            <input id="volumeSlider" type="range" min="0" max="1" defaultValue="1" step="0.01" />
            <span>+</span>
          </div>
          <button id="first">First</button>
          <button id="previous" onClick={this.previous}>Previous</button>
          <button id="play" onClick={mp.playOrPause}>Play</button>
          <button id="next" onClick={this.next}>Next</button>
          <button id="last">Last</button>
        </div>

        <div id="listSongs">
          <ul>
            { tracks.map(track => <li key={track.id} onClick={() => this.handleChangeSong(track)}>{track.artist} - {track.song}</li>) }
          </ul>
        </div>

      </div>
    );
  }
}

export default AudioPlayer;
