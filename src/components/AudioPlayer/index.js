import React, { Component } from 'react';
import mp from '../../helpers/player';
import tracks from '../../data';


class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks,
      song: tracks[0],
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.duration = this.duration.bind(this);
  }

  componentDidMount() {
    mp.duration = this.duration;
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

  duration(time) {
    console.log(time);
  }


  render() {
    const { song, tracks } = this.state;

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
            <span id="currentTime">00:00</span>
            <input type="range" min="0" defaultValue="0" />
            <span id="totalTime">{song.length}</span>
          </div>
          <div id="volume">
            <span>-</span>
            <input type="range" min="0" max="1" defaultValue="1" step="0.01" />
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
            {
              tracks.map(track => <li key={track.id} onClick={() => this.setState({ song: track })}>{track.artist} - {track.song}</li>) }
          </ul>
        </div>

      </div>
    );
  }
}

export default AudioPlayer;
