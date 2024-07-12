'use client'
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

export type PlaylistItem = {
  title: string;
  url: string;
};

interface MusicPlayerProps {
  playlist: PlaylistItem[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [currentVolume, setCurrentVolume] = useState(50); 
  const [showVolumeControl, setShowVolumeControl] = useState(false); 

  const handleTrackEnd = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
    event.target.setVolume(currentVolume); 
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    player.setVolume(newVolume);
    setCurrentVolume(newVolume);

    setTimeout(() => {
      setShowVolumeControl(false);
    }, 2000); 
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
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
      <div onClick={toggleVolumeControl} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faVolumeHigh} size="1x" style={{ marginRight: '10px', color: 'white' }} />
      </div>
      {showVolumeControl && (
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={currentVolume}
            onChange={handleVolumeChange}
            style={{ width: '100px', verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: '5px', color: 'white' }}>{currentVolume}</span>
        </div>
      )}
      <button onClick={handlePlayPause}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ marginLeft: '10px', color: 'white' }} />
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

