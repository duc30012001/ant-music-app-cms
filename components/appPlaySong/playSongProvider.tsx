import {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

interface Props extends PropsWithChildren {}

interface OnSeek {
  second: number;
  url?: string;
}

interface CurrentSong {
  id: number | null;
  url: string;
  isPlaying: boolean;
  currentTimePlaying: number;
}

interface PlaySongValue extends CurrentSong {
  onSeek: (value: OnSeek) => void;
  onPlay: (url?: string) => void;
  onStop: () => void;
}

const PlaySongContext = createContext<PlaySongValue>({
  id: null,
  url: '',
  isPlaying: false,
  currentTimePlaying: 0,
  onPlay: () => {},
  onSeek: () => {},
  onStop: () => {},
});

export const usePlaySong = () => useContext(PlaySongContext);

function PlaySongProvider({ children }: Props) {
  const songURL = useRef('');

  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  const [currentSong, setCurrentSong] = useState<CurrentSong>({
    id: null,
    url: '',
    isPlaying: false,
    currentTimePlaying: 0,
  });
  const { isPlaying, url, currentTimePlaying } = currentSong;

  const onPlay = (url?: string) => {
    setCurrentSong((currentValue) => ({
      ...currentValue,
      isPlaying: true,
      url: url ?? currentValue.url,
    }));
  };

  const onStop = () => {
    setCurrentSong((currentValue) => ({
      ...currentValue,
      isPlaying: false,
    }));
  };

  const onSeek = ({ second, url }: OnSeek) => {
    reactPlayerRef.current?.seekTo(second, 'seconds');
    setCurrentSong((currentValue) => ({
      ...currentValue,
      isPlaying: true,
      url: url ?? currentValue.url,
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
    if (songURL.current !== url) {
      songURL.current = url;
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
        onPlay={onPlay}
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
    </PlaySongContext.Provider>
  );
}

export default PlaySongProvider;
