import { AppContainer } from '@/components/appContainer';
import AppConfirm from '@/components/ui/modal/confirmModal';
import { OnDragEnd } from '@/components/ui/table/sortableTable';
import { useLoading, useModal, useTranslate } from '@/hooks';
import { useFilter } from '@/hooks/useFilter';
import { AdminLayout } from '@/layouts';
import { ThemeForm, ThemeHeader, ThemeTable } from '@/modules/theme/components';
import { TYPE_MODAL_THEME } from '@/modules/theme/enums';
import {
  useDeleteTheme,
  useThemeList,
  useUpdateThemeLocation,
} from '@/modules/theme/hooks';
import {
  DataFilterTheme,
  DeleteTheme,
  ThemeData,
  UpdateThemeLocation,
} from '@/modules/theme/types';

type Props = {};

function ThemePage({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { dataEdit, typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_THEME,
    ThemeData
  >();

  const defaultFilter: DataFilterTheme = {};

  const { dataFilter, onSearch } = useFilter<DataFilterTheme>(defaultFilter);

  const { dataTheme } = useThemeList(dataFilter);
  const { updateThemeLocation } = useUpdateThemeLocation();
  const { deleteTheme } = useDeleteTheme();

  function onConfirmDelete() {
    const variables: DeleteTheme = {
      themeId: dataEdit?.id as ThemeData['id'],
      onSuccess: closeModal,
    };
    deleteTheme(variables);
  }

  const onDragEnd: OnDragEnd<ThemeData[]> = (value) => {
    const data = value.map((item, index) => ({
      id: item.id,
      location: index + 1,
    }));

    const variables: UpdateThemeLocation = {
      payload: { data },
    };

    updateThemeLocation(variables);
  };

  return (
    <AppContainer appTitle={'Chủ đề'}>
      <ThemeHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <ThemeTable
        dataSource={dataTheme}
        onDragEnd={onDragEnd}
        openModal={openModal}
      />

      {(typeModal === TYPE_MODAL_THEME.UPDATE ||
        typeModal === TYPE_MODAL_THEME.CREATE) && (
        <ThemeForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {typeModal === TYPE_MODAL_THEME.DELETE && (
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

export default ThemePage;

ThemePage.Layout = AdminLayout;
