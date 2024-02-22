import { SongData } from '../types';
import SongItem from './songItem';

type Props = {
  dataSong: SongData[];
};

function SongList({ dataSong }: Props) {
  return (
    <div className="grid gap-1">
      {dataSong.map((item) => (
        <SongItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default SongList;
