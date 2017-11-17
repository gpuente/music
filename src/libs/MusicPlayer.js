class MusciPlayer {
  constructor(tracks, host) {
    this.isMounted = false;
    this.tracks = tracks || [];
    this.currentIndex = tracks.length || 0;
    this.currentSong = tracks[0] || {};
    this.host = host || '';
    this.source = host + tracks[0].source || '';
    this.duration = '';

    this.mount = this.mount.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.getAudioObject = this.getAudioObject.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.loadSong = this.loadSong.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  mount() {
    this.isMounted = true;
    this.song = new Audio(this.source);
    console.log(this.duration);
    this.song.ontimeupdate = () => this.duration(this.song.currentTime);
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

  getAudioObject() {
    return this.isMounted ? this.song : null;
  }
}

export default MusciPlayer;
