import { AppContainer } from '@/components/appContainer';
import AppPagination from '@/components/ui/pagination';
import { PAGE_SIZE } from '@/constants';
import { USER_STATUS } from '@/enums';
import { getCurrentPage } from '@/helpers';
import { useModal, useTranslate } from '@/hooks';
import { useFilter } from '@/hooks/useFilter';
import { AdminLayout } from '@/layouts';
import { UserForm, UserHeader, UserTable } from '@/modules/user/components';
import { TYPE_MODAL_USER } from '@/modules/user/enums';
import { useUpdateUserStatus, useUserList } from '@/modules/user/hooks';
import { DataFilterUser, UserData } from '@/modules/user/types';

type Props = {};

function UserPage({}: Props) {
  const defaultFilter: DataFilterUser = {
    offset: 0,
    limit: PAGE_SIZE,
    status: USER_STATUS.OPEN,
    role: undefined,
  };
  const { messages } = useTranslate();

  const { dataFilter, onChangePage, onChangeFilter, onSearch } =
    useFilter<DataFilterUser>(defaultFilter);

  const { updateUserStatus } = useUpdateUserStatus();

  const { dataUser, totalRecord } = useUserList(dataFilter);

  const currentPage = getCurrentPage(dataFilter.limit, PAGE_SIZE);

  const { dataEdit, typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_USER,
    UserData
  >();

  return (
    <AppContainer appTitle={messages('user.label')}>
      <UserHeader
        openModal={openModal}
        onChangeFilter={onChangeFilter}
        onSearch={onSearch}
        dataFilter={dataFilter}
      />
      <UserTable
        dataSource={dataUser.map((item) => ({ ...item, key: item.id }))}
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
        }}
        onUpdateStatusUser={updateUserStatus}
        openModal={openModal}
      />
      <AppPagination
        pageSize={PAGE_SIZE}
        current={currentPage}
        total={totalRecord}
        onChange={onChangePage}
      />

      {(typeModal === TYPE_MODAL_USER.UPDATE ||
        typeModal === TYPE_MODAL_USER.CREATE) && (
        <UserForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {/* {typeModal === TYPE_MODAL_USER.PERMISSION && (
        <UserPermission open onCancel={closeModal} dataEdit={dataEdit} />
      )} */}
    </AppContainer>
  );
}

export default UserPage;

UserPage.Layout = AdminLayout;
