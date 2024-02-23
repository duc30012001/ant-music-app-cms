import { AppModal, AppModalProps } from '@/components/ui/modal';
import { SongData } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

function DownloadModal({ dataEdit, ...props }: Props) {
  console.log('dataEdit:', dataEdit);
  return <AppModal {...props}>DownloadModal</AppModal>;
}

export default DownloadModal;
