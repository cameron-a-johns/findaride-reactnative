import { ApiBaseResult } from './api.model';

export interface UserModel extends ApiBaseResult {
  message: { userId: string };
}
