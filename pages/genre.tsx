import { AppContainer, AppHeader } from '@/components/appContainer';
import { AdminLayout } from '@/layouts';
import { Table } from 'antd';

type Props = {};

function GenrePage({}: Props) {
  return (
    <AppContainer appTitle="Thể loại">
      <AppHeader>Header</AppHeader>
      <Table />
    </AppContainer>
  );
}

export default GenrePage;

GenrePage.Layout = AdminLayout;
