import { GenreData } from '@/modules/genre/types';
import { ThemeData } from '@/modules/theme/types';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

interface FileType extends CommonAttribute {
  name: string;
}

interface SongKey {
  id: number;
  fileType: FileType;
  url: string;
}

interface SongGenre {
  id: number;
  genre: GenreData;
}

interface SongTheme {
  id: number;
  theme: ThemeData;
}

export interface SongData extends CommonAttribute {
  name: string;
  thumbnail: string;
  status: string;
  songGenre: SongGenre[];
  songTheme: SongTheme[];
  songKey: SongKey[];
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

export interface SongDetailData {
  data: SongData;
}

export interface SongPayload extends Pick<SongData, 'name'> {
  name: string;
  song: Array<{ id: SongDetailExists['id']; fileTypeId: FileType['id'] }>;
  genreId: Array<SongCategory['id']>;
  themeId: Array<SongCategory['id']>;
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

export interface DataFilterSong extends CommonParams {}
