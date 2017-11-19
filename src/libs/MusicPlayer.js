const parseTime = (secs) => {
  let min = Math.floor(secs / 60);
  let sec = Math.floor(secs % 60);

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  return {
    secs: Math.floor(secs),
    formatted: `${min}:${sec}`,
  };
};

class MusciPlayer {
  constructor(tracks, host) {
    this.isMounted = false;
    this.tracks = tracks || [];
    this.currentIndex = tracks.length || 0;
    this.currentSong = tracks[0] || {};
    this.host = host || '';
    this.source = host + tracks[0].source || '';
    this.duration = null;
    this.onLoadSong = null;

    this.mount = this.mount.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.getAudioObject = this.getAudioObject.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.loadSong = this.loadSong.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changeCurrentSong = this.changeCurrentSong.bind(this);
  }

  mount() {
    this.isMounted = true;
    this.song = new Audio(this.source);

    this.song.onloadeddata = () => {
      const data = {
        currentSong: this.currentSong,
        currentIndex: this.currentIndex,
        time: {
          currentTime: parseTime(this.song.currentTime),
          totalTime: parseTime(this.song.duration),
        },
      };

      this.onLoadSong(data);
    };

    this.song.ontimeupdate = () => {
      const time = parseTime(this.song.currentTime);
      this.duration(time);
    };
  }

  loadSong() {
    this.song.src = this.source;
    this.play();
  }

  playOrPause() {
    if (!this.isMounted) {
      console.warn('Object is not mounted. Mount the object (object.mount()) before play or pause.');
      return;
    }

    if (this.song.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  next() {
    const length = this.tracks.length;
    const nextI = this.currentIndex + 1;

    this.currentIndex = nextI >= length ? nextI % length : nextI;
    this.currentSong = this.tracks[this.currentIndex];
    this.source = this.host + this.currentSong.source;
    this.loadSong();
  }

  previous() {
    const length = this.tracks.length;
    const prevI = this.currentIndex - 1;
    this.currentIndex = prevI < 0 ? length - 1 : prevI;
    this.currentSong = this.tracks[this.currentIndex];
    this.source = this.host + this.currentSong.source;
    this.loadSong();
  }

  play() {
    console.log('play');
    if (!this.isMounted) return;
    this.song.play();
  }

  pause() {
    console.log('pause');
    if (!this.isMounted) return;
    this.song.pause();
  }

  changeCurrentTime(secs) {
    this.pause();
    this.song.currentTime = secs;
    this.play();
  }

  changeVolume(val) {
    this.song.volume = val;
  }

  changeCurrentSong(song) {
    this.pause();

    const i = this.tracks.findIndex(_song => (
      _song.id === song.id
    ));

    this.currentIndex = i;
    this.currentSong = this.tracks[i];
    this.source = this.host + this.currentSong.source;

    this.loadSong();
  }

  getAudioObject() {
    return this.isMounted ? this.song : null;
  }
}

export default MusciPlayer;
