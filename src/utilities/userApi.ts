import { ApiClient } from './api';
import { ApiUserModel } from '../models';

export class UserApi {
  private api: ApiClient;

  constructor(api?: ApiClient) {
    if (!api) {
      throw new Error('Issue starting API');
    }

    this.api = api;
  }

  addNewUser = (userId: string) => {
    return this.api.request<ApiUserModel>('users', { method: 'POST', data: { userId } });
  };

  checkUser = (userId: string) => {
    return this.api.request<ApiUserModel>(`users/${userId}`);
  };

  getUserProfile = async (user: string, historic = false) => {
    return this.api.request<ApiUserModel>(`users?${historic ? 'historic' : ''}`, { data: JSON.stringify(user) });
  };
}
