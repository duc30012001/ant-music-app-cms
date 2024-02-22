import { useGenreList } from '@/modules/genre/hooks';
import { useThemeList } from '@/modules/theme/hooks';
import { Divider } from 'antd';
import SidebarSection from './sidebarSection';

type Props = {};

function SongSidebar({}: Props) {
  const { dataGenre } = useGenreList({});
  const { dataTheme } = useThemeList({});

  const dataSidebarGenre = dataGenre.map(({ id, name }) => ({
    name,
    value: id,
  }));

  const dataSidebarTheme = dataTheme.map(({ id, name }) => ({
    name,
    value: id,
  }));

  return (
    <div className="py-3">
      <SidebarSection title="Thể loại" data={dataSidebarGenre} />
      <Divider />
      <SidebarSection title="Chủ đề" data={dataSidebarTheme} />
    </div>
  );
}

export default SongSidebar;
