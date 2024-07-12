"use client";
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeHigh, faRadiation, faRadio, faVolumeControlPhone, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export type PlaylistItem = {
  title: string;
  url: string;
};

interface MusicPlayerProps {
  playlist: PlaylistItem[];
}

const MusicPlayer = ({ playlist }: MusicPlayerProps) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  const handleTrackEnd = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      
      <FontAwesomeIcon icon={faVolumeHigh} size="1x" style={{ marginRight: '10px',color:'white' }} />
      <button onClick={handlePlayPause}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay}style={{ marginRight: '10px',color:'white' }} />
      </button>
      <YouTube
        videoId={new URL(playlist[currentTrack].url).searchParams.get('v')}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={handleTrackEnd}
      />
    </div>
  );
};

export default MusicPlayer;
