import { ActionButton } from '@/components/ui/button';
import { SortableTable, SortableTableProps } from '@/components/ui/table';
import { FILE_TYPE } from '@/enums';
import { formattedDate, getIndex } from '@/helpers';
import { OpenModalProps, useTranslate } from '@/hooks';
import type { ColumnsType } from 'antd/es/table';
import { TYPE_MODAL_FILE_TYPE } from '../enums';
import { FileTypeData } from '../types';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_FILE_TYPE, FileTypeData>;
} & Omit<SortableTableProps<FileTypeData>, 'columns'>;

function FileTypeTable({ openModal, ...props }: Props) {
  const { messages } = useTranslate();
  //   const { getPermissionRoute } = usePermission();
  //   const { canUpdate, canDelete } = getPermissionRoute();
  const canUpdate = true;
  const canDelete = true;

  const columns: ColumnsType<FileTypeData> = [
    {
      dataIndex: '',
      title: messages('common.no.'),
      align: 'center',
      width: 100,
      render: (text, record, index) => getIndex(0, 0, index),
    },
    {
      title: 'Loại file',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trả phí',
      dataIndex: 'pay',
      key: 'pay',
      align: 'center',
      width: 190,
      render: (cell) => {
        if (cell === FILE_TYPE.FREE) return 'Miễn phí';
        return 'Có phí';
      },
    },
    {
      title: messages('common.dateCreated'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 190,
      render: (cell) => formattedDate(cell),
    },
    {
      title: messages('common.dateUpdated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: 190,
      render: (cell) => formattedDate(cell),
    },
  ];

  if (canUpdate || canDelete) {
    columns.push({
      title: messages('common.action'),
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 120,
      render: (cell, record) => (
        <ActionButton
          showUpdate={canUpdate}
          showDelete={canDelete}
          onUpdate={() => openModal(TYPE_MODAL_FILE_TYPE.UPDATE, record)}
          onDelete={() => openModal(TYPE_MODAL_FILE_TYPE.DELETE, record)}
        />
      ),
    });
  }

  return <SortableTable {...props} columns={columns} />;
}

export default FileTypeTable;
