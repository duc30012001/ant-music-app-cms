import { UserData } from '@/modules/user/types';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface AppThemeData extends CommonAttribute {
  name: string;
  nameEn: string;
  location: number;
  thumbnail: string;
  color1: string;
  color2: string;
  color3: string;
  userCreateId: UserData['id'];
  user: Pick<UserData, 'id' | 'firstName' | 'lastName' | 'email'>;
}

export interface AppThemeDetailData {
  data: AppThemeData;
}

export interface AppThemePayload
  extends Pick<
    AppThemeData,
    'name' | 'nameEn' | 'thumbnail' | 'color1' | 'color2' | 'color3'
  > {}

export interface CreateAppTheme extends CommonFunction {
  payload: AppThemePayload;
}

export interface UpdateAppTheme extends CommonFunction {
  appThemeId: AppThemeData['id'];
  payload: AppThemePayload;
}

export interface UpdateAppThemeLocationPayload {
  data: Pick<AppThemeData, 'id' | 'location'>[];
}

export interface UpdateAppThemeLocation extends CommonFunction {
  payload: UpdateAppThemeLocationPayload;
}

export interface DeleteAppTheme extends CommonFunction {
  appThemeId: AppThemeData['id'];
}

export interface DataFilterAppTheme extends CommonParams {}
