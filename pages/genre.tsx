import { AppContainer } from '@/components/appContainer';
import AppConfirm from '@/components/ui/modal/confirmModal';
import { OnDragEnd } from '@/components/ui/table/sortableTable';
import { useLoading, useModal, useTranslate } from '@/hooks';
import { useFilter } from '@/hooks/useFilter';
import { GenreForm, GenreHeader, GenreTable } from '@/modules/genre/components';
import { TYPE_MODAL_GENRE } from '@/modules/genre/enums';
import {
  useDeleteGenre,
  useGenreList,
  useUpdateGenreLocation,
} from '@/modules/genre/hooks';
import {
  DataFilterGenre,
  DeleteGenre,
  GenreData,
  UpdateGenreLocation,
} from '@/modules/genre/types';

type Props = {};

function GenrePage({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { dataEdit, typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_GENRE,
    GenreData
  >();

  const defaultFilter: DataFilterGenre = {};

  const { dataFilter, onSearch } = useFilter<DataFilterGenre>(defaultFilter);

  const { dataGenre } = useGenreList(dataFilter);
  const { updateGenreLocation } = useUpdateGenreLocation();
  const { deleteGenre } = useDeleteGenre();

  function onConfirmDelete() {
    const variables: DeleteGenre = {
      genreId: dataEdit?.id as GenreData['id'],
      onSuccess: closeModal,
    };
    deleteGenre(variables);
  }

  const onDragEnd: OnDragEnd<GenreData[]> = (value) => {
    const data = value.map((item, index) => ({
      id: item.id,
      location: index + 1,
    }));

    const variables: UpdateGenreLocation = {
      payload: { data },
    };

    updateGenreLocation(variables);
  };

  return (
    <AppContainer appTitle={'Thể loại'}>
      <GenreHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <GenreTable
        dataSource={dataGenre}
        onDragEnd={onDragEnd}
        openModal={openModal}
      />

      {(typeModal === TYPE_MODAL_GENRE.UPDATE ||
        typeModal === TYPE_MODAL_GENRE.CREATE) && (
        <GenreForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {typeModal === TYPE_MODAL_GENRE.DELETE && (
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

export default GenrePage;
