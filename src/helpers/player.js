import MusicPlayer from '../libs/MusicPlayer';
import tracks from '../data';

const mp = new MusicPlayer(tracks, 'http://mediastream.guillermopuente.com/');

export default mp;
