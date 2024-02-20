import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface ThemeData extends CommonAttribute {
  name: string;
  location: number;
  thumbnail: string;
}

export interface ThemeDetailData {
  data: ThemeData;
}

export interface ThemePayload extends Pick<ThemeData, 'name'> {
  file: File;
}

export interface CreateTheme extends CommonFunction {
  payload: ThemePayload;
}

export interface UpdateTheme extends CommonFunction {
  themeId: ThemeData['id'];
  payload: ThemePayload;
}

export interface UpdateThemeLocationPayload {
  data: Pick<ThemeData, 'id' | 'location'>[];
}

export interface UpdateThemeLocation extends CommonFunction {
  payload: UpdateThemeLocationPayload;
}

export interface DeleteTheme extends CommonFunction {
  themeId: ThemeData['id'];
}

export interface DataFilterTheme extends CommonParams {}
