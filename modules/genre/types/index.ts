import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface GenreData extends CommonAttribute {
  name: string;
  location: number;
  thumbnail: string;
}

export interface GenreDetailData {
  data: GenreData;
}

export interface GenrePayload extends Pick<GenreData, 'name'> {
  file: File;
}

export interface CreateGenre extends CommonFunction {
  payload: GenrePayload;
}

export interface UpdateGenre extends CommonFunction {
  genreId: GenreData['id'];
  payload: GenrePayload;
}

export interface UpdateGenreLocationPayload {
  data: Pick<GenreData, 'id' | 'location'>[];
}

export interface UpdateGenreLocation extends CommonFunction {
  payload: UpdateGenreLocationPayload;
}

export interface DeleteGenre extends CommonFunction {
  genreId: GenreData['id'];
}

export interface DataFilterGenre extends CommonParams {}
