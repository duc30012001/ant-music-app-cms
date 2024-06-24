import { ActionButton } from '@/components/ui/button';
import { SortableTable, SortableTableProps } from '@/components/ui/table';
import { formattedDate, getIndex } from '@/helpers';
import { OpenModalProps, useTranslate } from '@/hooks';
import { Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TYPE_MODAL_THEME } from '../enums';
import { ThemeData } from '../types';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_THEME, ThemeData>;
} & Omit<SortableTableProps<ThemeData>, 'columns'>;

function ThemeTable({ openModal, ...props }: Props) {
  const { messages } = useTranslate();
  //   const { getPermissionRoute } = usePermission();
  //   const { canUpdate, canDelete } = getPermissionRoute();
  const canUpdate = true;
  const canDelete = true;

  const columns: ColumnsType<ThemeData> = [
    {
      dataIndex: '',
      title: messages('common.no.'),
      align: 'center',
      width: 100,
      render: (text, record, index) => getIndex(0, 0, index),
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 150,
      align: 'center',
      render: (cell, record) => (
        <div className="mx-auto aspect-square w-12 overflow-hidden rounded-lg">
          <Image src={cell} alt={record.name} />
        </div>
      ),
    },
    {
      title: 'Chủ đề',
      dataIndex: 'name',
      key: 'name',
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
          onUpdate={() => openModal(TYPE_MODAL_THEME.UPDATE, record)}
          onDelete={() => openModal(TYPE_MODAL_THEME.DELETE, record)}
        />
      ),
    });
  }

  return <SortableTable {...props} columns={columns} />;
}

export default ThemeTable;
