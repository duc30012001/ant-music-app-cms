import { OnPlay, OnSeek, usePlaySong } from '@/components/appPlaySong';
import { useEffect, useState } from 'react';

interface UseSongStatusProps {
  //   peakData: string;
  //   duration: number | string;
  url: string;
}

export const useSongStatus = (id: number) => {
  const {
    onSeek,
    onStop,
    onPlay,
    isPlaying: playing,
    currentTimePlaying: currentTime,
    songId,
  } = usePlaySong();

  const [playStatus, setPlayStatus] = useState({
    isPlaying: false,
    currentTimePlaying: 0,
  });

  const { isPlaying } = playStatus;

  const handleSeeking = (value: OnSeek) => {
    onSeek(value);
  };

  const handlePlay = (value: OnPlay) => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(value);
    }
  };

  useEffect(() => {
    if (songId === id) {
      setPlayStatus({
        isPlaying: playing,
        currentTimePlaying: currentTime,
      });
    } else {
      setPlayStatus((prev) => ({
        ...prev,
        isPlaying: false,
      }));
    }
  }, [playing, currentTime, id, songId]);

  return {
    handleSeeking,
    handlePlay,
    ...playStatus,
  };
};
