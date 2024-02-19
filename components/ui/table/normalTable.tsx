import { SCREEN } from '@/enums';
import { Table, TableProps } from 'antd';

export type AppTableProps<RecordType> = {} & TableProps<RecordType>;

const AppTable = <RecordType extends object>({
  scroll,
  ...props
}: AppTableProps<RecordType>) => {
  return (
    <Table
      size="small"
      {...props}
      pagination={false}
      scroll={{
        x: SCREEN.LG,
        ...scroll,
      }}
    />
  );
};

export default AppTable;
