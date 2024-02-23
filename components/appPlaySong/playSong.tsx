import { convertSecondsToTime } from '@/helpers';
import { FaPause, FaPlay } from 'react-icons/fa';
import { usePlaySong } from './playSongProvider';
import Waveform from './waveform';

type Props = {
  peakData: string;
  duration: number | string;
  url: string;
};

function PlaySong({ peakData, duration, url }: Props) {
  const peaks = peakData?.split(';') ?? [];
  const { onSeek, onStop, onPlay, ...value } = usePlaySong();

  const isPlaying = url === value.url ? value.isPlaying : false;
  const currentTimePlaying = url === value.url ? value.currentTimePlaying : 0;

  const handleSeeking = (second: number) => {
    onSeek({ second, url });
  };

  const handlePlay = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(url);
    }
  };
  return (
    <div>
      <div className="flex h-full items-center">
        <div
          className="grid aspect-square w-9 flex-none cursor-pointer place-content-center rounded-full text-white"
          style={{ backgroundColor: 'tomato' }}
          onClick={handlePlay}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="w-16 flex-none">
          <p className="text-center">
            {convertSecondsToTime(currentTimePlaying)}
          </p>
        </div>
        <Waveform
          peakData={peakData}
          pos={currentTimePlaying}
          duration={duration}
          onClick={handleSeeking}
        />
        <div className="w-16 flex-none">
          <p className="text-center">
            {convertSecondsToTime(Number(duration))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaySong;
