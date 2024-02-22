import { convertSecondsToTime } from '@/helpers';
import dynamic from 'next/dynamic';
import { FaPause, FaPlay } from 'react-icons/fa';
import { usePlaySong } from './playSongProvider';

// @ts-ignore
const Waveform = dynamic(() => import('react-audio-waveform'), {
  ssr: false,
});

type Props = {
  peakData: string;
  duration: number | string;
  url: string;
};

function PlaySong({ peakData, duration, url }: Props) {
  const peaks = peakData?.split(';') ?? [];
  const { onSeek, currentTimePlaying, isPlaying, onPlay, onStop } =
    usePlaySong();

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
        <div className="w-full overflow-hidden">
          {peaks.length > 0 && (
            // @ts-ignore
            <Waveform
              // @ts-ignore
              peaks={peaks}
              height={40}
              pos={currentTimePlaying}
              duration={duration}
              onClick={handleSeeking}
              color="#c7c7c9"
              progressColor="tomato"
              transitionDuration={100}
            />
          )}
        </div>
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
