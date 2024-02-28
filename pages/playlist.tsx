import { AppContainer } from '@/components/appContainer';
import { AppConfirm } from '@/components/ui/modal';
import AppPagination from '@/components/ui/pagination';
import { PAGE_SIZE } from '@/constants';
import { getCurrentPage } from '@/helpers';
import { useFilter, useLoading, useModal, useTranslate } from '@/hooks';
import {
  PlaylistForm,
  PlaylistHeader,
  PlaylistTable,
} from '@/modules/playlist/components';
import { TYPE_MODAL_PLAYLIST } from '@/modules/playlist/enums';
import {
  useDeletePlaylist,
  usePlaylistList,
  usePlaylistSidebar,
} from '@/modules/playlist/hooks';
import {
  DataFilterPlaylist,
  DeletePlaylist,
  PlaylistData,
} from '@/modules/playlist/types';
import { SongSidebar } from '@/modules/song/components';

type Props = {};

function Playlist({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { typeModal, openModal, closeModal, dataEdit } = useModal<
    TYPE_MODAL_PLAYLIST,
    PlaylistData
  >();

  const defaultFilter: DataFilterPlaylist = {
    offset: 0,
    limit: PAGE_SIZE,
  };

  const { dataFilter, onSearch, onChangeFilter, onChangePage } =
    useFilter<DataFilterPlaylist>(defaultFilter);

  const { dataPlaylist, totalRecord } = usePlaylistList(dataFilter);
  const { dataSidebar } = usePlaylistSidebar(dataFilter);
  const { deletePlaylist } = useDeletePlaylist();

  const currentPage = getCurrentPage(dataFilter.limit, PAGE_SIZE);

  function onConfirmDelete() {
    const variables: DeletePlaylist = {
      playlistId: dataEdit?.playList_id as PlaylistData['playList_id'],
      onSuccess: closeModal,
    };
    deletePlaylist(variables);
  }
  return (
    <AppContainer
      appTitle="Danh sách phát"
      sidebarContent={
        <SongSidebar
          dataFilter={dataFilter}
          onChangeFilter={onChangeFilter as any}
          dataSidebar={dataSidebar}
        />
      }
    >
      <PlaylistHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
        onChangeFilter={onChangeFilter}
      />
      <PlaylistTable
        dataSource={dataPlaylist}
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
        }}
        // onUpdateStatusPlaylist={updatePlaylistStatus}
        loading={loading}
        openModal={openModal}
      />
      <AppPagination
        pageSize={PAGE_SIZE}
        current={currentPage}
        total={totalRecord}
        onChange={onChangePage}
      />

      {(typeModal === TYPE_MODAL_PLAYLIST.UPDATE ||
        typeModal === TYPE_MODAL_PLAYLIST.CREATE) && (
        <PlaylistForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {typeModal === TYPE_MODAL_PLAYLIST.DELETE && (
        <AppConfirm
          open
          modalTitle={`${messages('delete.confirmTitle')} ${dataEdit?.playList_name}`}
          onCancel={closeModal}
          onOk={onConfirmDelete}
          paragraph={messages('delete.confirmMessage')}
          loading={loading}
        />
      )}
    </AppContainer>
  );
}

export default Playlist;
