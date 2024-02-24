import { AppModal, AppModalProps } from '@/components/ui/modal';
import { handleError } from '@/helpers';
import { Button } from 'antd';
import { FaFileDownload } from 'react-icons/fa';
import { songApi } from '../api';
import { FileType, SongData, SongKey } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

function DownloadModal({ dataEdit, ...props }: Props) {
  const songName = dataEdit?.name ?? '';

  const handleDownload = (
    id: SongKey['id'],
    fileTypeName: FileType['name']
  ) => {
    const fileName = `${songName}_${fileTypeName}`;
    songApi
      .getLinkDownloadFile(id, fileName)
      .then((response) => {
        const url = response.data.docs.url;
        window.open(url, '_blank');
      })
      .catch((error) => {
        handleError(error);
      });
  };
  return (
    <AppModal {...props} title={`Tải xuống ${songName}`} footer={null}>
      {dataEdit?.songKey?.map((item) => {
        const { fileType, id } = item;
        const name = fileType.name;
        return (
          <Button
            key={id}
            type="primary"
            icon={<FaFileDownload />}
            className="mb-2 !flex items-center justify-center"
            block
            onClick={() => handleDownload(id, name)}
          >
            {name}
          </Button>
        );
      })}
    </AppModal>
  );
}

export default DownloadModal;
