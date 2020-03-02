import { ApiClient } from './api';
import { UserModel } from '../models';

export class UserApi {
  private api: ApiClient;

  constructor(api?: ApiClient) {
    if (!api) {
      throw new Error('Issue starting API');
    }

    this.api = api;
  }

  addNewUser = (userId: string) => {
    return this.api.request<boolean>('users', { method: 'POST', data: JSON.stringify(userId) });
  };

  getUserProfile = async (user: string, historic = false) => {
    return this.api.request<UserModel>(`users?${historic ? 'historic' : ''}`, { data: JSON.stringify(user) });
  };
}
