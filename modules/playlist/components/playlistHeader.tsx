import { AppHeader, AppHeaderGroup } from '@/components/appContainer';
import CreateButton from '@/components/ui/button/createButton';
import AppSearch, { OnSearchType } from '@/components/ui/input/search';
import { OnChangeFilter, OpenModalProps } from '@/hooks';
import { TYPE_MODAL_PLAYLIST } from '../enums';
import { DataFilterPlaylist, PlaylistData } from '../types';
import PlaylistStatusSelect from './playlistStatusSelect';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_PLAYLIST, PlaylistData>;
  onSearch: OnSearchType;
  dataFilter: DataFilterPlaylist;
  onChangeFilter: OnChangeFilter<DataFilterPlaylist>;
};

function PlaylistHeader({
  openModal,
  onSearch,
  dataFilter,
  onChangeFilter,
}: Props) {
  //   const { getPermissionRoute } = usePermission();
  //   const { canCreate } = getPermissionRoute();
  const canCreate = true;
  return (
    <AppHeader>
      <AppHeaderGroup>
        <AppSearch onChange={onSearch} defaultValue={dataFilter.keyword} />
        <PlaylistStatusSelect
          className="w-full lg:w-48"
          onChange={(value) => onChangeFilter({ status: value })}
          value={dataFilter.status}
        />
      </AppHeaderGroup>
      <AppHeaderGroup position="end" className="flex-1">
        <CreateButton
          onClick={() => openModal(TYPE_MODAL_PLAYLIST.CREATE, null)}
          canCreate={canCreate}
        />
      </AppHeaderGroup>
    </AppHeader>
  );
}

export default PlaylistHeader;
