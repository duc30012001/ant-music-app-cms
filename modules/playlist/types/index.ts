import { SongData } from '@/modules/song/types';
import { UserData } from '@/modules/user/types';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface StatusData extends CommonAttribute {
  name: string;
}

export interface PlaylistData {
  playList_created_at: CommonAttribute['createdAt'];
  playList_updated_at: CommonAttribute['updatedAt'];
  playList_id: CommonAttribute['id'];
  playList_name: string;
  playList_name_en: string;
  playList_playlist_id: UserData['id'];
  playList_status_id: StatusData['id'];
  playlist_id: UserData['id'];
  playlist_first_name: UserData['firstName'];
  playlist_last_name: UserData['lastName'];
  status_created_at: CommonAttribute['createdAt'];
  status_updated_at: CommonAttribute['updatedAt'];
  status_id: StatusData['id'];
  status_name: StatusData['name'];
  totalSongs: string;
  songGenres: string;
  songThemes: string;
}

export interface PlaylistDetailData extends CommonAttribute {
  name: string;
  nameEn: string;
  playlistId: UserData['id'];
  statusId: StatusData['id'];
  status: StatusData;
}

export interface PlaylistDetail {
  data: PlaylistDetailData;
}

export interface CreatePlaylistPayload
  extends Pick<PlaylistDetailData, 'name' | 'nameEn'> {
  status: StatusData['name'];
  songId: Array<SongData['id']>;
}

export interface CreatePlaylist extends CommonFunction {
  payload: CreatePlaylistPayload;
}

export interface UpdatePlaylistPayload extends Partial<CreatePlaylistPayload> {}

export interface UpdatePlaylist extends CommonFunction {
  playlistId: PlaylistDetailData['id'];
  payload: UpdatePlaylistPayload;
}

export interface AddSongToPlaylistPayload {
  playlistId: PlaylistDetailData['id'];
  songId: SongData['id'];
}

export interface AddSongToPlaylist extends CommonFunction {
  payload: AddSongToPlaylistPayload;
}

export interface RemoveSongFromPlaylistPayload {
  playlistId: PlaylistDetailData['id'];
  songId: SongData['id'];
}

export interface RemoveSongFromPlaylist extends CommonFunction {
  payload: RemoveSongFromPlaylistPayload;
}

export interface UpdateSongOfPlaylistPayload {
  playlistId: PlaylistDetailData['id'];
  songId: Array<SongData['id']>;
}

export interface UpdateSongOfPlaylist extends CommonFunction {
  payload: UpdateSongOfPlaylistPayload;
}

export interface DeletePlaylist extends CommonFunction {
  playlistId: PlaylistDetailData['id'];
}

export interface DataFilterPlaylist extends CommonParams {
  genreId?: string;
  themeId?: string;
}
