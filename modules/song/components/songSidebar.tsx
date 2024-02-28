import { OnChangeFilter } from '@/hooks';
import { Divider } from 'antd';
import { DataFilterSong, DataSidebar } from '../types';
import SidebarSection from './sidebarSection';

type Props = {
  dataFilter: DataFilterSong;
  onChangeFilter: OnChangeFilter<DataFilterSong>;
  dataSidebar: DataSidebar;
};

function SongSidebar({ dataFilter, onChangeFilter, dataSidebar }: Props) {
  const dataSidebarGenre = (dataSidebar.genre?.data ?? []).map(
    ({ genre_id, genre_name, songCount }) => ({
      name: genre_name,
      value: genre_id,
      songCount,
    })
  );

  const dataSidebarTheme = (dataSidebar.theme?.data ?? []).map(
    ({ theme_id, theme_name, songCount }) => ({
      name: theme_name,
      value: theme_id,
      songCount,
    })
  );

  return (
    <div className="py-3">
      <SidebarSection
        title="Thể loại"
        data={dataSidebarGenre}
        categoryValue={dataFilter.genreId}
        onChange={(value) =>
          onChangeFilter({
            genreId: value,
          })
        }
      />
      <Divider />
      <SidebarSection
        title="Chủ đề"
        data={dataSidebarTheme}
        categoryValue={dataFilter.themeId}
        onChange={(value) =>
          onChangeFilter({
            themeId: value,
          })
        }
      />
    </div>
  );
}

export default SongSidebar;
