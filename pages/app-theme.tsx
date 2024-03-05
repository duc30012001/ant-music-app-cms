import { AppContainer } from '@/components/appContainer';
import AppConfirm from '@/components/ui/modal/confirmModal';
import { OnDragEnd } from '@/components/ui/table/sortableTable';
import { useLoading, useModal, useTranslate } from '@/hooks';
import { useFilter } from '@/hooks/useFilter';
import {
  AppThemeForm,
  AppThemeHeader,
  AppThemeTable,
} from '@/modules/appTheme/components';
import { TYPE_MODAL_APP_THEME } from '@/modules/appTheme/enums';
import {
  useAppThemeList,
  useDeleteAppTheme,
  useUpdateAppThemeLocation,
} from '@/modules/appTheme/hooks';
import {
  AppThemeData,
  DataFilterAppTheme,
  DeleteAppTheme,
  UpdateAppThemeLocation,
} from '@/modules/appTheme/types';

type Props = {};

function AppThemePage({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { dataEdit, typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_APP_THEME,
    AppThemeData
  >();

  const defaultFilter: DataFilterAppTheme = {};

  const { dataFilter, onSearch } = useFilter<DataFilterAppTheme>(defaultFilter);

  const { dataAppTheme } = useAppThemeList(dataFilter);
  const { updateAppThemeLocation } = useUpdateAppThemeLocation();
  const { deleteAppTheme } = useDeleteAppTheme();

  function onConfirmDelete() {
    const variables: DeleteAppTheme = {
      appThemeId: dataEdit?.id as AppThemeData['id'],
      onSuccess: closeModal,
    };
    deleteAppTheme(variables);
  }

  const onDragEnd: OnDragEnd<AppThemeData[]> = (value) => {
    const data = value.map((item, index) => ({
      id: item.id,
      location: index + 1,
    }));

    const variables: UpdateAppThemeLocation = {
      payload: { data },
    };

    updateAppThemeLocation(variables);
  };

  return (
    <AppContainer appTitle={'Chủ đề app'}>
      <AppThemeHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <AppThemeTable
        dataSource={dataAppTheme}
        onDragEnd={onDragEnd}
        openModal={openModal}
      />

      {(typeModal === TYPE_MODAL_APP_THEME.UPDATE ||
        typeModal === TYPE_MODAL_APP_THEME.CREATE) && (
        <AppThemeForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {typeModal === TYPE_MODAL_APP_THEME.DELETE && (
        <AppConfirm
          open
          modalTitle={`${messages('delete.confirmTitle')} ${dataEdit?.name}`}
          onCancel={closeModal}
          onOk={onConfirmDelete}
          paragraph={messages('delete.confirmMessage')}
          loading={loading}
        />
      )}
    </AppContainer>
  );
}

export default AppThemePage;
