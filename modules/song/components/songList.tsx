import { OnChangeFilter, OpenModalProps } from '@/hooks';
import { TYPE_MODAL_SONG } from '../enums';
import { DataFilterSong, SongData } from '../types';
import SongItem from './songItem';

type Props = {
  dataSong: SongData[];
  openModal: OpenModalProps<TYPE_MODAL_SONG, SongData>;
  onChangeFilter: OnChangeFilter<DataFilterSong>;
};

function SongList({ dataSong, openModal, onChangeFilter }: Props) {
  return (
    <div className="grid gap-1">
      {dataSong.map((item) => (
        <SongItem
          key={item.id}
          data={item}
          openModal={openModal}
          onChangeFilter={onChangeFilter}
        />
      ))}
    </div>
  );
}

export default SongList;
