import { AppHeader, AppHeaderGroup } from '@/components/appContainer';
import CreateButton from '@/components/ui/button/createButton';
import AppSearch, { OnSearchType } from '@/components/ui/input/search';
import { OpenModalProps } from '@/hooks';
import { OnChangeFilter } from '@/hooks/useFilter';
import { TYPE_MODAL_USER } from '../enums';
import { DataFilterUser, UserData } from '../types';
import UserRoleSelect from './userRoleSelect';
import UserStatusSelect from './userStatusSelect';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_USER, UserData>;
  onSearch: OnSearchType;
  onChangeFilter: OnChangeFilter<DataFilterUser>;
  dataFilter: DataFilterUser;
};

function UserHeader({
  openModal,
  onSearch,
  onChangeFilter,
  dataFilter,
}: Props) {
  //   const { getPermissionRoute } = usePermission();
  //   const { canCreate } = getPermissionRoute();
  const canCreate = true;
  return (
    <AppHeader>
      <AppHeaderGroup>
        <AppSearch onChange={onSearch} defaultValue={dataFilter.keyword} />
        <UserRoleSelect
          className="w-full lg:w-48"
          onChange={(value) => onChangeFilter({ role: value })}
          value={dataFilter.role}
        />
        <UserStatusSelect
          className="w-full lg:w-48"
          onChange={(value) => onChangeFilter({ status: value })}
          value={dataFilter.status}
        />
      </AppHeaderGroup>
      <AppHeaderGroup position="end" className="flex-1">
        <CreateButton
          onClick={() => openModal(TYPE_MODAL_USER.CREATE, null)}
          canCreate={canCreate}
        />
      </AppHeaderGroup>
    </AppHeader>
  );
}

export default UserHeader;
