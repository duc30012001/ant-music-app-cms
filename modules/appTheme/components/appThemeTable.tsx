import { ActionButton } from '@/components/ui/button';
import { SortableTable, SortableTableProps } from '@/components/ui/table';
import { formattedDate, getIndex } from '@/helpers';
import { OpenModalProps, useTranslate } from '@/hooks';
import { Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TYPE_MODAL_APP_THEME } from '../enums';
import { AppThemeData } from '../types';

type Props = {
  openModal: OpenModalProps<TYPE_MODAL_APP_THEME, AppThemeData>;
} & Omit<SortableTableProps<AppThemeData>, 'columns'>;

function AppThemeTable({ openModal, ...props }: Props) {
  const { messages } = useTranslate();
  //   const { getPermissionRoute } = usePermission();
  //   const { canUpdate, canDelete } = getPermissionRoute();
  const canUpdate = true;
  const canDelete = true;

  const columns: ColumnsType<AppThemeData> = [
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
      render: (cell, record) => <Image alt={record.name} src={cell} />,
    },
    {
      title: 'Tên',
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
          onUpdate={() => openModal(TYPE_MODAL_APP_THEME.UPDATE, record)}
          onDelete={() => openModal(TYPE_MODAL_APP_THEME.DELETE, record)}
        />
      ),
    });
  }

  return <SortableTable {...props} columns={columns} />;
}

export default AppThemeTable;
