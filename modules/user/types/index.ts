import { ROLE, USER_STATUS } from '@/enums';
import { CommonAttribute, CommonFunction, CommonParams } from '@/types';

export interface RoleData extends CommonAttribute {
  name: string;
}

export interface StatusData extends CommonAttribute {
  name: string;
}

export interface UserData extends Omit<CommonAttribute, 'id'> {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleData;
  status: StatusData;
}

export interface UserDetailData {
  data: UserData;
}

export interface CreateUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUser extends CommonFunction {
  payload: CreateUserPayload;
}

export interface UpdateUserPayload extends CreateUserPayload {
  roleId: ROLE;
}

export interface UpdateUser extends CommonFunction {
  userId: UserData['id'];
  payload: UpdateUserPayload;
}

export interface UpdateStatusUserPayload {
  status: USER_STATUS;
}

export interface UpdateStatusUser extends CommonFunction {
  userId: UserData['id'];
  payload: UpdateStatusUserPayload;
}

export type OnUpdateStatusUserType = (
  userId: UserData['id'],
  status: boolean
) => void;

export interface DataFilterUser extends CommonParams {
  status?: USER_STATUS;
  role?: ROLE;
}
