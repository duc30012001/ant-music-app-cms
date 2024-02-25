import { cn, getOriginalSongURL } from '@/helpers';
import { useModal, useSongStatus } from '@/hooks';
import { DownloadModal } from '@/modules/song/components';
import ButtonIcon from '@/modules/song/components/buttonIcon';
import { TYPE_MODAL_SONG } from '@/modules/song/enums';
import { useSongDetail } from '@/modules/song/hooks';
import { SongData, SongKey } from '@/modules/song/types';
import { Avatar, Tooltip } from 'antd';
import { useState } from 'react';
import { FaMinus, FaTimes } from 'react-icons/fa';
import { IoPause, IoPlay } from 'react-icons/io5';
import { LuDownload, LuExternalLink } from 'react-icons/lu';
import { RiMusicFill } from 'react-icons/ri';
import { usePlaySong } from './playSongProvider';
import SongTime from './songTime';
import Waveform from './waveform';

type Props = {};

function PlayerBar({}: Props) {
  const { songId, url, currentTimePlaying, onSeek, isPlaying, onStop } =
    usePlaySong();
  const { handlePlay } = useSongStatus(songId as number);
  const [isMinimize, setIsMinimize] = useState(false);

  const { dataSongDetail } = useSongDetail(songId);
  const { name, thumbnail, songKey, idString } = dataSongDetail;

  const songLink = getOriginalSongURL(idString);

  const file =
    songKey?.find(
      (item) => item.url?.split('?')?.[0] === url?.split('?')?.[0]
    ) ?? ({} as SongKey);
  const { duration, peakdata } = file;

  const { typeModal, openModal, closeModal, dataEdit } = useModal<
    TYPE_MODAL_SONG,
    SongData
  >();

  function toggleMinimize() {
    setIsMinimize(!isMinimize);
  }

  if (!songId) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 flex min-h-20 items-center gap-10 bg-gray-200 py-3 pl-20 pr-24 transition-all duration-500',
        {
          '-bottom-20': isMinimize,
          invisible: Number(songId) < 0,
        }
      )}
    >
      <div className="flex items-center">
        {/* <ButtonIcon className="p-3 text-2xl" icon={<IoShuffle />} />
        <ButtonIcon className="p-3 text-2xl" icon={<IoPlaySkipBack />} /> */}
        <ButtonIcon
          className="p-3 text-3xl"
          icon={isPlaying ? <IoPause /> : <IoPlay />}
          onClick={() => handlePlay({ url, songId })}
        />
        {/* <ButtonIcon className="p-3 text-2xl" icon={<IoPlaySkipForward />} />
        <ButtonIcon className="p-3 text-2xl" icon={<IoRepeat />} /> */}
      </div>

      <div className="flex items-center gap-2">
        <Avatar
          icon={<RiMusicFill className="inline align-baseline !text-xl" />}
          className="rounded-lg !bg-gray-400/70 text-white"
          src={thumbnail}
          shape="square"
          size={45}
        />
        <p className="w-60 truncate">{name}</p>
      </div>

      <div className="flex grow items-center gap-2">
        <SongTime className="text-center" value={currentTimePlaying} />
        <Waveform
          peakData={peakdata ?? ''}
          duration={duration}
          pos={currentTimePlaying}
          onClick={(second) => onSeek({ url, second, songId })}
        />
        <SongTime className="text-center" value={duration} />
      </div>

      <div className="flex-none">
        <ButtonIcon
          title="Tải xuống"
          icon={<LuDownload />}
          onClick={() => openModal(TYPE_MODAL_SONG.DOWNLOAD, dataSongDetail)}
        />
        <a href={songLink} target="_blank">
          <ButtonIcon title="Bài gốc" icon={<LuExternalLink />} />
        </a>
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
          <button
            className="grid place-content-center px-3 py-1 hover:bg-gray-300"
            onClick={() => onStop(true)}
          >
            <FaTimes />
          </button>
        </Tooltip>
      </div>

      {typeModal === TYPE_MODAL_SONG.DOWNLOAD && (
        <DownloadModal open onCancel={closeModal} dataEdit={dataEdit} />
      )}
    </div>
  );
}

export default PlayerBar;
