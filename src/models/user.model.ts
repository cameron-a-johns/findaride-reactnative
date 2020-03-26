import { ApiBaseResult } from './api.model';

export interface ApiUserModel extends ApiBaseResult {
  message: { userId: string };
}

export interface UserModel {
  name: string;
  username: string;
}
