import { AppContainer } from '@/components/appContainer';
import { useFilter, useLoading, useModal, useTranslate } from '@/hooks';
import {
  CreateSong,
  SongHeader,
  SongList,
  SongSidebar,
} from '@/modules/song/components';
import { TYPE_MODAL_SONG } from '@/modules/song/enums';
import { useSongList } from '@/modules/song/hooks';
import { DataFilterSong, SongData } from '@/modules/song/types';

type Props = {};

function SongPage({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_SONG,
    SongData
  >();

  const defaultFilter: DataFilterSong = {};

  const { dataFilter, onSearch } = useFilter<DataFilterSong>(defaultFilter);

  const { dataSong } = useSongList(dataFilter);
  console.log('dataSong:', dataSong);
  return (
    <AppContainer appTitle="Bài hát" sidebarContent={<SongSidebar />}>
      <SongHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <SongList />

      {typeModal === TYPE_MODAL_SONG.CREATE && (
        <CreateSong open onCancel={closeModal} />
      )}
    </AppContainer>
  );
}

export default SongPage;
