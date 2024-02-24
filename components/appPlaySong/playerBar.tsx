import { cn } from '@/helpers';
import ButtonIcon from '@/modules/song/components/buttonIcon';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { FaMinus, FaTimes } from 'react-icons/fa';
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
  const [isMinimize, setIsMinimize] = useState(false);

  function toggleMinimize() {
    setIsMinimize(!isMinimize);
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 flex min-h-20 items-center gap-10 bg-gray-200 py-3 pl-20 pr-24 transition-all duration-500',
        {
          '-bottom-20': isMinimize,
        }
      )}
    >
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

      <div className="absolute -top-5 right-0 flex items-center overflow-hidden rounded-t-lg bg-gray-200">
        <Tooltip title="Thu nhỏ" placement="topRight">
          <button
            className="grid place-content-center px-3 py-1 hover:bg-gray-300"
            onClick={toggleMinimize}
          >
            <FaMinus />
          </button>
        </Tooltip>
        <Tooltip title="Đóng" placement="topRight">
          <button className="grid place-content-center px-3 py-1 hover:bg-gray-300">
            <FaTimes />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default PlayerBar;
