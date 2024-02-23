import { SongTime, Waveform } from '@/components/appPlaySong';
import { useHover } from '@uidotdev/usehooks';
import { Avatar } from 'antd';
import { FaPlay } from 'react-icons/fa';
import { LuDownload, LuExternalLink, LuPenSquare } from 'react-icons/lu';
import { RiMusicFill } from 'react-icons/ri';
import { SongData } from '../types';
import ButtonIcon from './buttonIcon';

type Props = {
  data: SongData;
};

const SIZE = 45;

function SongItem({ data }: Props) {
  const { name, songGenre, songKey, thumbnail, songTheme, idString } = data;
  const [ref, hovering] = useHover();
  const audio = songKey?.[0] ?? {};
  const { duration, peakdata } = audio;

  const songLink = `https://fe.ant-music.net/songs/${idString}`;

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 px-7 py-3 hover:bg-slate-100"
    >
      <div>
        {hovering ? (
          <Avatar
            className="cursor-pointer"
            style={{ backgroundColor: 'tomato' }}
            size={SIZE}
            icon={<FaPlay className="inline align-baseline text-base" />}
          />
        ) : (
          <Avatar
            src={thumbnail}
            size={SIZE}
            icon={<RiMusicFill className="inline align-baseline" />}
            className="flex-none"
          />
        )}
      </div>
      <div className="w-60 flex-none truncate">{name}</div>
      <Waveform
        peakData={peakdata ?? ''}
        //   pos={currentTimePlaying}
        duration={duration}
        //   onClick={handleSeeking}
      />
      <SongTime value={duration} />
      <div className="w-52 flex-none">
        <div>
          {songGenre.map(({ id, genre }, index) => (
            <span
              key={id}
              // onClick={() => handleClickMusicTag(item.id, 'genre')}
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
              // onClick={() => handleClickMusicTag(item.id, 'theme')}
              className="hover:cursor-pointer hover:underline"
            >
              {theme.name}
              {index + 1 === songGenre.length ? '' : ', '}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-none">
        <ButtonIcon title="Tải xuống" icon={<LuDownload />} />
        <a href={songLink} target="_blank">
          <ButtonIcon title="Bài gốc" icon={<LuExternalLink />} />
        </a>
        <ButtonIcon title="Cập nhật" icon={<LuPenSquare />} />
      </div>
    </div>
  );
}

export default SongItem;
