import { OnChangeFilter } from '@/hooks';
import { Divider } from 'antd';
import { useSongSidebar } from '../hooks';
import { DataFilterSong } from '../types';
import SidebarSection from './sidebarSection';

type Props = {
  dataFilter: DataFilterSong;
  onChangeFilter: OnChangeFilter<DataFilterSong>;
};

function SongSidebar({ dataFilter, onChangeFilter }: Props) {
  const { dataSidebar } = useSongSidebar(dataFilter);

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
