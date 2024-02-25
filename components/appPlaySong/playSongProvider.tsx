import {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import PlayerBar from './playerBar';

interface Props extends PropsWithChildren {}

export interface OnPlay {
  url: string;
  songId: number;
}

export interface OnSeek extends OnPlay {
  second: number;
}

interface CurrentSong {
  songId: number | null;
  fileId: number | null;
  url: string;
  isPlaying: boolean;
  currentTimePlaying: number;
}

interface PlaySongValue extends CurrentSong {
  onSeek: (value: OnSeek) => void;
  onPlay: (value: OnPlay) => void;
  onStop: (stop?: boolean) => void;
}

const defaultValue = {
  songId: null,
  fileId: null,
  url: '',
  isPlaying: false,
  currentTimePlaying: 0,
};

const PlaySongContext = createContext<PlaySongValue>({
  ...defaultValue,
  onPlay: () => {},
  onSeek: () => {},
  onStop: () => {},
});

export const usePlaySong = () => useContext(PlaySongContext);

function PlaySongProvider({ children }: Props) {
  const songIdRef = useRef<number | null>(null);

  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  const [currentSong, setCurrentSong] = useState<CurrentSong>(defaultValue);
  const { isPlaying, url, songId, currentTimePlaying } = currentSong;

  const onPlay = ({ url, songId }: OnPlay) => {
    setCurrentSong((currentValue) => ({
      ...currentValue,
      isPlaying: true,
      url: url ?? currentValue.url,
      songId: songId ?? currentValue.songId,
    }));
  };

  const onStop = (close?: boolean) => {
    if (close) {
      setCurrentSong(defaultValue);
    } else {
      setCurrentSong((currentValue) => ({
        ...currentValue,
        isPlaying: false,
      }));
    }
  };

  const onSeek = ({ second, url, songId }: OnSeek) => {
    reactPlayerRef.current?.seekTo(second, 'seconds');
    setCurrentSong((currentValue) => ({
      ...currentValue,
      isPlaying: true,
      url: url ?? currentValue.url,
      songId: songId ?? currentValue.songId,
      currentTimePlaying: second,
    }));
  };

  const handleProgress = (state: OnProgressProps) => {
    setCurrentSong((currentValue) => ({
      ...currentValue,
      currentTimePlaying: state.playedSeconds,
    }));
  };

  const onReady = () => {
    if (Number(songIdRef.current) !== Number(songId)) {
      songIdRef.current = songId;
      reactPlayerRef.current?.seekTo(currentTimePlaying, 'seconds');
    }
  };

  return (
    <PlaySongContext.Provider
      value={{
        ...currentSong,
        onPlay,
        onSeek,
        onStop,
      }}
    >
      {children}

      <ReactPlayer
        url={url}
        ref={reactPlayerRef}
        width="100%"
        height="50px"
        controls
        playing={isPlaying}
        // onPlay={onPlay}
        volume={1}
        onProgress={handleProgress}
        // onEnded={onEnded}
        onReady={onReady}
        config={{
          file: {
            attributes: {
              // preload: 'none',
              // preload: 'metadata',
            },
          },
        }}
        style={{ display: 'none' }}
        // loop={loop}
      />
      <PlayerBar />
    </PlaySongContext.Provider>
  );
}

export default PlaySongProvider;
