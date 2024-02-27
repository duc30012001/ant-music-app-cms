import { SongTime, Waveform } from '@/components/appPlaySong';
import { getOriginalSongURL } from '@/helpers';
import { OnChangeFilter, OpenModalProps, useSongStatus } from '@/hooks';
import { useHover } from '@uidotdev/usehooks';
import { Avatar } from 'antd';
import { FaPause, FaPlay } from 'react-icons/fa';
import {
  LuDownload,
  LuExternalLink,
  LuPenSquare,
  LuPlus,
  LuTrash,
} from 'react-icons/lu';
import { RiMusicFill } from 'react-icons/ri';
import { TYPE_MODAL_SONG } from '../enums';
import { DataFilterSong, SongData } from '../types';
import ButtonIcon from './buttonIcon';

type Props = {
  data: SongData;
  openModal: OpenModalProps<TYPE_MODAL_SONG, SongData>;
  onChangeFilter: OnChangeFilter<DataFilterSong>;
};

const SIZE = 45;

function SongItem({ data, openModal, onChangeFilter }: Props) {
  const { name, songGenre, songKey, thumbnail, songTheme, idString, id } = data;
  const [ref, hovering] = useHover();
  const audio = songKey?.[0] ?? {};
  const { duration, peakdata, url } = audio;
  const { isPlaying, handlePlay, currentTimePlaying, handleSeeking } =
    useSongStatus(id);

  const songLink = getOriginalSongURL(idString);

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 px-7 py-3 hover:bg-slate-100"
    >
      <div className="relative">
        {(hovering || isPlaying) && (
          <Avatar
            className="!absolute top-0 z-10 cursor-pointer"
            style={{ backgroundColor: 'tomato' }}
            size={SIZE}
            icon={
              isPlaying ? (
                <FaPause className="inline align-baseline text-base" />
              ) : (
                <FaPlay className="inline align-baseline text-base" />
              )
            }
            onClick={() => handlePlay({ url, songId: id })}
          />
        )}
        <Avatar
          src={thumbnail}
          size={SIZE}
          icon={<RiMusicFill className="inline align-baseline" />}
          className="flex-none"
        />
      </div>
      <div className="w-60 flex-none truncate">{name}</div>
      <Waveform
        peakData={peakdata ?? ''}
        pos={currentTimePlaying}
        duration={duration}
        onClick={(second) => handleSeeking({ url, second, songId: id })}
      />
      <SongTime value={duration} />
      <div className="w-52 flex-none">
        <div>
          {songGenre.map(({ id, genre }, index) => (
            <span
              key={id}
              // onClick={() => onChangeFilter({ genreId: [id] })}
              className="hover:cursor-pointer hover:underline"
            >
              {genre.name}
              {index + 1 === songGenre.length ? '' : ', '}
            </span>
          ))}
        </div>
        <div>
          {songTheme.map(({ id, theme }, index) => (
            <span
              key={id}
              // onClick={() => onChangeFilter({ themeId: [id] })}
              className="hover:cursor-pointer hover:underline"
            >
              {theme.name}
              {index + 1 === songGenre.length ? '' : ', '}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-none">
        <ButtonIcon
          title="Thêm vào danh sách phát"
          icon={<LuPlus />}
          onClick={() => openModal(TYPE_MODAL_SONG.ADD_TO_PLAYLIST, data)}
        />
        <ButtonIcon
          title="Tải xuống"
          icon={<LuDownload />}
          onClick={() => openModal(TYPE_MODAL_SONG.DOWNLOAD, data)}
        />
        <a href={songLink} target="_blank">
          <ButtonIcon title="Bài gốc" icon={<LuExternalLink />} />
        </a>
        <ButtonIcon
          title="Cập nhật"
          icon={<LuPenSquare />}
          onClick={() => openModal(TYPE_MODAL_SONG.UPDATE, data)}
        />
        <ButtonIcon
          title="Xoá"
          icon={<LuTrash />}
          onClick={() => openModal(TYPE_MODAL_SONG.DELETE, data)}
        />
      </div>
    </div>
  );
}

export default SongItem;
