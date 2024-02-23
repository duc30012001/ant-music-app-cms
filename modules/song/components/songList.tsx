import { OpenModalProps } from '@/hooks';
import { TYPE_MODAL_SONG } from '../enums';
import { SongData } from '../types';
import SongItem from './songItem';

type Props = {
  dataSong: SongData[];
  openModal: OpenModalProps<TYPE_MODAL_SONG, SongData>;
};

function SongList({ dataSong, openModal }: Props) {
  return (
    <div className="grid gap-1">
      {dataSong.map((item) => (
        <SongItem key={item.id} data={item} openModal={openModal} />
      ))}
    </div>
  );
}

export default SongList;
