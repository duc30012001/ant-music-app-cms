import { AppContainer, AppHeader } from '@/components/appContainer';
import { AdminLayout } from '@/layouts';
import { Table } from 'antd';

type Props = {};

function ThemePage({}: Props) {
  return (
    <AppContainer appTitle="Chủ đề">
      <AppHeader>Header</AppHeader>
      <Table />
    </AppContainer>
  );
}

export default ThemePage;

ThemePage.Layout = AdminLayout;
