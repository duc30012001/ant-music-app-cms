import { ActionButton } from '@/components/ui/button';
import { SortableTable, SortableTableProps } from '@/components/ui/table';
import { formattedDate, getIndex } from '@/helpers';
import { OpenModalProps, useTranslate } from '@/hooks';
import { Image, Tooltip } from 'antd';
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
      width: 100,
      align: 'center',
      render: (cell, record) => <Image alt={record.name} src={cell} />,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (cell, record) => {
        return (
          <div>
            <Tooltip title="Tên Tiếng Việt" placement="right">
              <span className="hover:text-primary">{record.name}</span>
            </Tooltip>
            <br />
            <Tooltip title="Tên Tiếng Anh" placement="right">
              <span className="hover:text-primary">{record.nameEn}</span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: 'Màu chủ đạo',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
      width: 130,
      render: (cell) => (
        <Tooltip title={cell}>
          <div
            className="mx-auto h-10 w-10 rounded-lg"
            style={{ backgroundColor: cell }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Màu nền',
      dataIndex: 'color1',
      key: 'color1',
      align: 'center',
      width: 130,
      render: (cell) => (
        <Tooltip title={cell}>
          <div
            className="mx-auto h-10 w-10 rounded-lg"
            style={{ backgroundColor: cell }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Màu chữ',
      dataIndex: 'color2',
      key: 'color2',
      align: 'center',
      width: 130,
      render: (cell) => (
        <Tooltip title={cell}>
          <div
            className="mx-auto h-10 w-10 rounded-lg"
            style={{ backgroundColor: cell }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Màu viền',
      dataIndex: 'color3',
      key: 'color3',
      align: 'center',
      width: 130,
      render: (cell) => (
        <Tooltip title={cell}>
          <div
            className="mx-auto h-10 w-10 rounded-lg"
            style={{ backgroundColor: cell }}
          />
        </Tooltip>
      ),
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
