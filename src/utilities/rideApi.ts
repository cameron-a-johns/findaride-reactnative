import { ApiClient } from './api';
import { RideBase, RideDetail } from '../models/ride.model';

export class RideApi {
  private api: ApiClient;

  constructor(api?: ApiClient) {
    if (!api) {
      throw new Error('Issue starting API');
    }

    this.api = api;
  }

  getRidesForUser = async (user: string, historic = false) => {
    return this.api.request<RideBase[]>(`rides?${historic ? 'historic' : ''}`, { data: JSON.stringify(user) });
  };

  getRide = async (user: string, rideId: string) => {
    return this.api.request<RideDetail>(`rides/${rideId}`, { data: JSON.stringify(user) });
  };
}
