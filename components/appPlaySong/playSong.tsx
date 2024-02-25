import { cn } from '@/helpers';
import { useSongStatus } from '@/hooks';
import { FaPause, FaPlay } from 'react-icons/fa';
import SongTime from './songTime';
import Waveform from './waveform';

type Props = {
  peakData: string;
  duration: number | string;
  url: string;
  showPlayButton?: boolean;
};

function PlaySong({ peakData, duration, url, showPlayButton = true }: Props) {
  const id = Math.random() * -1;
  const { isPlaying, handlePlay, currentTimePlaying, handleSeeking } =
    useSongStatus(id);

  return (
    <div>
      <div className="flex h-full items-center">
        <div
          className={cn(
            'grid aspect-square w-9 flex-none cursor-pointer place-content-center rounded-full text-white',
            {
              hidden: !showPlayButton,
            }
          )}
          style={{ backgroundColor: 'tomato' }}
          onClick={() => handlePlay({ songId: id, url })}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <SongTime value={currentTimePlaying} />
        <Waveform
          peakData={peakData}
          pos={currentTimePlaying}
          duration={duration}
          onClick={(second) => handleSeeking({ url, second, songId: id })}
        />
        <SongTime value={duration} />
      </div>
    </div>
  );
}

export default PlaySong;
