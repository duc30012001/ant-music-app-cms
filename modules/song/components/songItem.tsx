import { convertSecondsToTime } from '@/helpers';
import { useHover } from '@uidotdev/usehooks';
import { Avatar } from 'antd';
import dynamic from 'next/dynamic';
import { FaPlay } from 'react-icons/fa';
import { LuDownload, LuExternalLink, LuPenSquare } from 'react-icons/lu';
import { RiMusicFill } from 'react-icons/ri';
import { SongData } from '../types';
import ButtonIcon from './buttonIcon';

// @ts-ignore
const Waveform = dynamic(() => import('react-audio-waveform'), {
  ssr: false,
});

type Props = {
  data: SongData;
};

const SIZE = 45;

function SongItem({ data }: Props) {
  const { name, songGenre, songKey, thumbnail, songTheme } = data;
  const [ref, hovering] = useHover();
  const audio = songKey?.[0] ?? {};
  const { duration, peakdata } = audio;
  const peaks = peakdata?.split(';') ?? [];

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
      <div className="w-full overflow-hidden">
        {peaks.length > 0 && (
          // @ts-ignore
          <Waveform
            // @ts-ignore
            peaks={peaks}
            height={40}
            //   pos={currentTimePlaying}
            duration={duration}
            //   onClick={handleSeeking}
            color="#c7c7c9"
            progressColor="tomato"
            transitionDuration={100}
          />
        )}
      </div>
      <div className="w-16 flex-none">
        <p className="">{convertSecondsToTime(Number(duration))}</p>
      </div>
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
        <ButtonIcon title="Bài gốc" icon={<LuExternalLink />} />
        <ButtonIcon title="Cập nhật" icon={<LuPenSquare />} />
      </div>
    </div>
  );
}

export default SongItem;
