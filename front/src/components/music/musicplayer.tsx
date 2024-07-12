import MusicPlayer from "./music";

const playlist = [
  { title: 'Song 1', url: 'URL_DEL_AUDIO_1' },
  { title: 'Song 2', url: 'URL_DEL_AUDIO_2' },
  // Agrega más canciones según sea necesario
];

const HomePage = () => {
  return (
    <div>
      <MusicPlayer playlist={playlist} />
    </div>
  );
};

export default HomePage;
