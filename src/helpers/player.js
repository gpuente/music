import MusicPlayer from '../libs/MusicPlayer';
import tracks from '../data';

const mp = new MusicPlayer(tracks, 'http://192.168.8.102:3001/');

export default mp;
