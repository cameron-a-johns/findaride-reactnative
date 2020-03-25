import { AccessToken } from 'react-native-fbsdk';
import { config } from '../config/environment';

type idP = 'facebook' | undefined;

export interface AuthProvider {
  getToken: () => Promise<string | undefined>;
  getAppId: () => string;
}
export class Auth implements AuthProvider {
  private _idp: idP;

  set idp(value: idP) {
    this._idp = value;
  }

  getToken = () => {
    if (!this._idp) {
      return Promise.reject(new Error('IdP not set'));
    }

    switch (this._idp) {
      case 'facebook':
        return AccessToken.getCurrentAccessToken().then(result => result?.accessToken);
      default:
        return Promise.reject(new Error('Unknown IDP'));
    }
  };

  getAppId = () => {
    return config.clientId;
  };
}
