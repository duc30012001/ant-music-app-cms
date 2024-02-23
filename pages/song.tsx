import { AppContainer } from '@/components/appContainer';
import AppPagination from '@/components/ui/pagination';
import { PAGE_SIZE } from '@/constants';
import { getCurrentPage } from '@/helpers';
import { useFilter, useLoading, useModal, useTranslate } from '@/hooks';
import {
  CreateSong,
  DownloadModal,
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

  const { typeModal, openModal, closeModal, dataEdit } = useModal<
    TYPE_MODAL_SONG,
    SongData
  >();

  const defaultFilter: DataFilterSong = {
    offset: 0,
    limit: PAGE_SIZE,
  };

  const { dataFilter, onSearch, onChangeFilter, onChangePage } =
    useFilter<DataFilterSong>(defaultFilter);

  const { dataSong, totalRecord } = useSongList(dataFilter);
  console.log('dataSong:', dataSong);

  const currentPage = getCurrentPage(dataFilter.limit, PAGE_SIZE);
  return (
    <AppContainer
      appTitle="Bài hát"
      sidebarContent={
        <SongSidebar dataFilter={dataFilter} onChangeFilter={onChangeFilter} />
      }
    >
      <SongHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <SongList dataSong={dataSong} openModal={openModal} />
      <AppPagination
        pageSize={PAGE_SIZE}
        current={currentPage}
        total={totalRecord}
        onChange={onChangePage}
      />

      {typeModal === TYPE_MODAL_SONG.CREATE && (
        <CreateSong open onCancel={closeModal} />
      )}

      {typeModal === TYPE_MODAL_SONG.DOWNLOAD && (
        <DownloadModal open onCancel={closeModal} dataEdit={dataEdit} />
      )}
    </AppContainer>
  );
}

export default SongPage;
