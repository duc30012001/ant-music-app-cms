import { AppHeader, AppHeaderGroup } from '@/components/appContainer';
import CreateButton from '@/components/ui/button/createButton';
import AppSearch, { OnSearchType } from '@/components/ui/input/search';
import { OpenModalProps } from '@/hooks';
import { TYPE_MODAL_GENRE } from '../enums';
import { DataFilterGenre, GenreData } from '../types';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_GENRE, GenreData>;
  onSearch: OnSearchType;
  dataFilter: DataFilterGenre;
};

function GenreHeader({ openModal, onSearch, dataFilter }: Props) {
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
          onClick={() => openModal(TYPE_MODAL_GENRE.CREATE, null)}
          canCreate={canCreate}
        />
      </AppHeaderGroup>
    </AppHeader>
  );
}

export default GenreHeader;
