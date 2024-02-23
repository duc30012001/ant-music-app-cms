import { AppContainer } from '@/components/appContainer';
import AppConfirm from '@/components/ui/modal/confirmModal';
import { OnDragEnd } from '@/components/ui/table/sortableTable';
import { useLoading, useModal, useTranslate } from '@/hooks';
import { useFilter } from '@/hooks/useFilter';
import {
  FileTypeForm,
  FileTypeHeader,
  FileTypeTable,
} from '@/modules/fileType/components';
import { TYPE_MODAL_FILE_TYPE } from '@/modules/fileType/enums';
import {
  useDeleteFileType,
  useFileTypeList,
  useUpdateFileTypeLocation,
} from '@/modules/fileType/hooks';
import {
  DataFilterFileType,
  DeleteFileType,
  FileTypeData,
  UpdateFileTypeLocation,
} from '@/modules/fileType/types';

type Props = {};

function FileTypePage({}: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();

  const { dataEdit, typeModal, openModal, closeModal } = useModal<
    TYPE_MODAL_FILE_TYPE,
    FileTypeData
  >();

  const defaultFilter: DataFilterFileType = {};

  const { dataFilter, onSearch } = useFilter<DataFilterFileType>(defaultFilter);

  const { dataFileType } = useFileTypeList(dataFilter);
  const { updateFileTypeLocation } = useUpdateFileTypeLocation();
  const { deleteFileType } = useDeleteFileType();

  function onConfirmDelete() {
    const variables: DeleteFileType = {
      fileTypeId: dataEdit?.id as FileTypeData['id'],
      onSuccess: closeModal,
    };
    deleteFileType(variables);
  }

  const onDragEnd: OnDragEnd<FileTypeData[]> = (value) => {
    const data = value.map((item, index) => ({
      id: item.id,
      location: index + 1,
    }));

    const variables: UpdateFileTypeLocation = {
      payload: { data },
    };

    updateFileTypeLocation(variables);
  };

  return (
    <AppContainer appTitle={'Loại file'}>
      <FileTypeHeader
        dataFilter={dataFilter}
        onSearch={onSearch}
        openModal={openModal}
      />
      <FileTypeTable
        dataSource={dataFileType}
        onDragEnd={onDragEnd}
        openModal={openModal}
      />

      {(typeModal === TYPE_MODAL_FILE_TYPE.UPDATE ||
        typeModal === TYPE_MODAL_FILE_TYPE.CREATE) && (
        <FileTypeForm open onCancel={closeModal} dataEdit={dataEdit} />
      )}

      {typeModal === TYPE_MODAL_FILE_TYPE.DELETE && (
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

export default FileTypePage;
