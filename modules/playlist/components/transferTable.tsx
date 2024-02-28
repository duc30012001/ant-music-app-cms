import { useSongList } from '@/modules/song/hooks';
import { SongData } from '@/modules/song/types';
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from 'antd';
import { Table, Transfer } from 'antd';
import difference from 'lodash/difference';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: SongData[];
  leftColumns: TableColumnsType<SongData>;
  rightColumns: TableColumnsType<SongData>;
}

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const tableColumns: TableColumnsType<SongData> = [
  {
    title: 'Tên bài hát',
    dataIndex: 'name',
  },
  {
    title: 'Thể loại',
    dataIndex: 'songGenre',
    render: (cell, record) => {
      const genresName = record.songGenre
        .map((item) => item.genre.name)
        .join(', ');
      return genresName;
    },
  },
  {
    title: 'Chủ đề',
    dataIndex: 'songTheme',
    render: (cell, record) => {
      const themesName = record.songTheme
        .map((item) => item.theme.name)
        .join(', ');
      return themesName;
    },
  },
];

interface TransferTableProps {
  onChange: (nextTargetKeys: string[]) => void;
  targetKeys: string[];
}

const TransferTable = ({ targetKeys, onChange }: TransferTableProps) => {
  const { dataSong } = useSongList({});

  const dataSource = dataSong.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  return (
    <TableTransfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      showSearch
      onChange={onChange}
      filterOption={(inputValue, item: SongData) => {
        const value = inputValue?.trim()?.toLowerCase();
        return (
          item.name?.toLowerCase()?.indexOf(value) !== -1 ||
          item.songGenre?.findIndex((item) =>
            item.genre.name.toLowerCase().includes(value)
          ) !== -1 ||
          item.songTheme?.findIndex((item) =>
            item.theme.name.toLowerCase().includes(value)
          ) !== -1
        );
      }}
      leftColumns={tableColumns}
      rightColumns={tableColumns}
    />
  );
};

export default TransferTable;
