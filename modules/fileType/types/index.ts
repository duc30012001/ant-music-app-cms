import { FILE_TYPE } from '@/enums';
import { UserData } from '@/modules/user/types';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface FileTypeData extends CommonAttribute {
  name: string;
  location: number;
  pay: FILE_TYPE;
  userCreateId: UserData['id'];
  user: Pick<UserData, 'id' | 'firstName' | 'lastName' | 'email'>;
}

export interface FileTypeDetailData {
  data: FileTypeData;
}

export interface FileTypePayload extends Pick<FileTypeData, 'name' | 'pay'> {}

export interface CreateFileType extends CommonFunction {
  payload: FileTypePayload;
}

export interface UpdateFileType extends CommonFunction {
  fileTypeId: FileTypeData['id'];
  payload: FileTypePayload;
}

export interface UpdateFileTypeLocationPayload {
  data: Pick<FileTypeData, 'id' | 'location'>[];
}

export interface UpdateFileTypeLocation extends CommonFunction {
  payload: UpdateFileTypeLocationPayload;
}

export interface DeleteFileType extends CommonFunction {
  fileTypeId: FileTypeData['id'];
}

export interface DataFilterFileType extends CommonParams {}
