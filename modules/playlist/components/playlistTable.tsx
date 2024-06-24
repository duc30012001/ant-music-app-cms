import { ActionButton } from '@/components/ui/button';
import { AppTable, AppTableProps } from '@/components/ui/table';
import { PLAYLIST_STATUS } from '@/enums';
import { formattedDate, formattedNumber, getIndex } from '@/helpers';
import { OpenModalProps, useTranslate } from '@/hooks';
import { Image, Switch, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { TYPE_MODAL_PLAYLIST } from '../enums';
import { useUpdatePlaylist } from '../hooks';
import { PlaylistData } from '../types';

type Props = {
  // onUpdateStatusUser?: OnUpdateStatusUserType;
  openModal: OpenModalProps<TYPE_MODAL_PLAYLIST, PlaylistData>;
  pagination: Pick<TablePaginationConfig, 'pageSize' | 'current'>;
} & Omit<AppTableProps<PlaylistData>, 'columns'>;

function PlaylistTable({ openModal, ...props }: Props) {
  const { messages } = useTranslate();
  //   const { getPermissionRoute } = usePermission();
  //   const { canUpdate, canDelete } = getPermissionRoute();
  const canUpdate = true;
  const canDelete = true;

  const { updatePlaylist } = useUpdatePlaylist();

  const onUpdateStatus = (
    playlistId: PlaylistData['playList_id'],
    status: boolean
  ) => {
    const playlistStatus = status ? PLAYLIST_STATUS.OPEN : PLAYLIST_STATUS.LOCK;
    updatePlaylist({
      playlistId,
      payload: {
        status: playlistStatus,
      },
    });
  };

  const columns: ColumnsType<PlaylistData> = [
    {
      dataIndex: '',
      title: messages('common.no.'),
      align: 'center',
      width: 80,
      render: (text, record, index) =>
        getIndex(props.pagination.pageSize, props.pagination.current, index),
    },
    {
      title: 'Thumbnail',
      dataIndex: 'playList_thumbnail',
      key: 'playList_thumbnail',
      width: 80,
      align: 'center',
      render: (cell, record) => (
        <div className="mx-auto aspect-square w-12 overflow-hidden rounded-lg">
          <Image src={cell} alt={record.playList_name} />
        </div>
      ),
    },
    {
      title: 'Tên danh sách',
      dataIndex: 'playList_name',
      key: 'playList_name',
      width: 250,
      render: (cell, record) => {
        return (
          <div>
            <Tooltip title="Tên Tiếng Việt" placement="right">
              <span className="hover:text-primary">{record.playList_name}</span>
            </Tooltip>
            <br />
            <Tooltip title="Tên Tiếng Anh" placement="right">
              <span className="hover:text-primary">
                {record.playList_name_en}
              </span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: 'Số bài hát',
      dataIndex: 'totalSongs',
      key: 'totalSongs',
      align: 'center',
      width: 120,
      render: (cell) => formattedNumber(cell),
    },
    {
      title: 'Thể loại',
      dataIndex: 'songGenres',
      key: 'songGenres',
      width: 200,
      render: (cell) => cell?.split(',')?.join(', '),
    },
    {
      title: 'Chủ đề',
      dataIndex: 'songThemes',
      key: 'songThemes',
      width: 200,
      render: (cell) => cell?.split(',')?.join(', '),
    },
    {
      title: messages('common.dateCreated'),
      dataIndex: 'playList_created_at',
      key: 'playList_created_at',
      align: 'center',
      width: 120,
      render: (cell) => formattedDate(cell),
    },
    // {
    //   title: messages('common.dateUpdated'),
    //   dataIndex: 'playList_updated_at',
    //   key: 'playList_updated_at',
    //   align: 'center',
    //   width: 120,
    //   render: (cell) => formattedDate(cell),
    // },
  ];

  if (canUpdate || canDelete) {
    columns.splice(
      columns.length,
      0,
      {
        title: messages('status.label'),
        dataIndex: 'status_name',
        key: 'status_name',
        align: 'center',
        render: (cell, record) => (
          <Switch
            defaultChecked={cell === PLAYLIST_STATUS.OPEN ? true : false}
            onChange={(status) => onUpdateStatus?.(record.playList_id, status)}
          />
        ),
      },
      {
        title: messages('common.action'),
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 100,
        render: (cell, record) => (
          <ActionButton
            showUpdate={canUpdate}
            showDelete={canDelete}
            onUpdate={() => openModal(TYPE_MODAL_PLAYLIST.UPDATE, record)}
            onDelete={() => openModal(TYPE_MODAL_PLAYLIST.DELETE, record)}
          />
        ),
      }
    );
  }

  return <AppTable {...props} columns={columns} />;
}

export default PlaylistTable;
