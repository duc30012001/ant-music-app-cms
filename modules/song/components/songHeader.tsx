import { AppHeader, AppHeaderGroup } from '@/components/appContainer';
import CreateButton from '@/components/ui/button/createButton';
import AppSearch, { OnSearchType } from '@/components/ui/input/search';
import { OpenModalProps } from '@/hooks';
import { TYPE_MODAL_SONG } from '../enums';
import { DataFilterSong, SongData } from '../types';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_SONG, SongData>;
  onSearch: OnSearchType;
  dataFilter: DataFilterSong;
};

function SongHeader({ openModal, onSearch, dataFilter }: Props) {
  //   const { getPermissionRoute } = usePermission();
  //   const { canCreate } = getPermissionRoute();
  const canCreate = true;
  return (
    <AppHeader>
      <AppHeaderGroup>
        <AppSearch onChange={onSearch} defaultValue={dataFilter.keyword} />
      </AppHeaderGroup>
      <AppHeaderGroup position="end" className="flex-1">
        <CreateButton
          onClick={() => openModal(TYPE_MODAL_SONG.CREATE, null)}
          canCreate={canCreate}
        />
      </AppHeaderGroup>
    </AppHeader>
  );
}

export default SongHeader;
