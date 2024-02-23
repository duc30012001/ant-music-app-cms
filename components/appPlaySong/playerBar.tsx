import ButtonIcon from '@/modules/song/components/buttonIcon';
import {
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeat,
  IoShuffle,
} from 'react-icons/io5';
import { LuDownload, LuExternalLink } from 'react-icons/lu';
import { RiMusicFill } from 'react-icons/ri';
import SongTime from './songTime';
import Waveform from './waveform';

type Props = {};

function PlayerBar({}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-10 bg-gray-200 py-3 pl-20 pr-24">
      <div className="flex items-center">
        <ButtonIcon className="p-3 text-2xl" icon={<IoShuffle />} />
        <ButtonIcon className="p-3 text-2xl" icon={<IoPlaySkipBack />} />
        <ButtonIcon className="p-3 text-3xl" icon={<IoPlay />} />
        <ButtonIcon className="p-3 text-2xl" icon={<IoPlaySkipForward />} />
        <ButtonIcon className="p-3 text-2xl" icon={<IoRepeat />} />
      </div>

      <div className="flex items-center gap-2">
        <ButtonIcon
          icon={<RiMusicFill />}
          className="rounded-lg !bg-gray-400/70 text-white"
        />
        <p className="w-60 truncate">Rudolph The Red Nosed Reindeer</p>
      </div>

      <div className="flex grow items-center gap-2">
        <SongTime className="text-center" value={0} />
        <Waveform peakData="" duration={100} />
        <SongTime className="text-center" value={100} />
      </div>

      <div className="flex-none">
        <ButtonIcon title="Tải xuống" icon={<LuDownload />} />
        <ButtonIcon title="Bài gốc" icon={<LuExternalLink />} />
      </div>
    </div>
  );
}

export default PlayerBar;
