import { GenreData } from '@/modules/genre/types';
import { ThemeData } from '@/modules/theme/types';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface FileType extends CommonAttribute {
  name: string;
}

interface SongGenre {
  id: number;
  genre: GenreData;
}

interface SongTheme {
  id: number;
  theme: ThemeData;
}

interface SongCategory {
  id: number;
  name: string;
}

interface SongDetailURL {
  id: number;
  file_type: string;
  name: string;
  extension: string;
  url: string;
  fileType?: {
    contentType: 'string';
    format: string;
    id: number;
    name: string;
  };
}

export interface SongDetailExists {
  id: number;
  name: string;
  release_status: number;
  contentID_status: boolean;
  type: number;
  status: number;
  upload_date: Date;
  license: string;
  note: string;
  count_view: number;
  id_string: string;
  slug: string;
  bpm: string;
  key: string;
  count_download: number;
  count_favorite: number;
  phaseId: number;
  ISRC: string | null;
  is_beat: boolean;
  expiryDate: null | Date;
  assess: null | number;
  is_original: number;
  url_source: string;
  namespace: string;
  clone: 0;
  songLabelId: null | number;
  songNetworkId: null | number;
  genres: SongCategory[];
  themes: SongCategory[];
  moods: SongCategory[];
  effects: SongCategory[];
  intrusmentals: SongCategory[];
  detail_url: SongDetailURL[];
}

export interface SongKey {
  id: number;
  fileType: FileType;
  url: string;
  peakdata: null | string;
  duration: string;
  detailUrlId: SongDetailURL['id'];
}

export interface SongData extends CommonAttribute {
  name: string;
  thumbnail: string;
  idString: string;
  status: string;
  songGenre: SongGenre[];
  songTheme: SongTheme[];
  songKey: SongKey[];
  songId: SongDetailExists['id'];
}

export interface SongDetailData {
  data: SongData;
}

export interface SongPayload extends Pick<SongData, 'name'> {
  name: string;
  songId: SongDetailExists['id'];
  song: Array<{ id: SongDetailExists['id']; fileTypeId: FileType['id'] }>;
  genreId: Array<SongCategory['id']>;
  themeId: Array<SongCategory['id']>;
  thumbnail?: string;
}

export interface CreateSong extends CommonFunction {
  payload: SongPayload;
}

export interface UpdateSong extends CommonFunction {
  songId: SongData['id'];
  payload: SongPayload;
}

export interface DeleteSong extends CommonFunction {
  songId: SongData['id'];
}

export interface DataFilterSong extends CommonParams {
  genreId?: string;
  themeId?: string;
  status?: string;
}

interface DataSidebarGenre {
  genre_id: GenreData['id'];
  genre_name: GenreData['name'];
  songCount: number;
}

interface DataSidebarTheme {
  theme_id: ThemeData['id'];
  theme_name: ThemeData['name'];
  songCount: number;
}

export interface DataSidebar {
  genre: {
    name: string;
    data: DataSidebarGenre[];
  };
  theme: {
    name: string;
    data: DataSidebarTheme[];
  };
}

export interface DataDownload {
  url: string;
}
