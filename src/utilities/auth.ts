import { AccessToken, LoginManager } from 'react-native-fbsdk';
import SyncStorage from 'sync-storage';
import { config } from '../config/environment';
import { StorageKeys } from './const';

export type idP = 'facebook' | undefined;

const storedClient = () => {
  try {
    const val = SyncStorage.get(StorageKeys.idp) as idP;
    return val ?? undefined;
  } catch {
    return undefined;
  }
};

export interface AuthProvider {
  getToken: () => Promise<string | undefined>;
  getAppId: () => string;
}

export class Auth implements AuthProvider {
  private static _instance: Auth;

  private _idp: idP;

  private constructor(idp: idP) {
    this._idp = idp;
  }

  static getInstance(idp?: idP) {
    if (!this._instance) {
      if (!idp) {
        const storedIdp = storedClient();
        if (storedIdp) {
          this._instance = new Auth(storedIdp);
          return this._instance;
        }
        return undefined;
      }
      this._instance = new Auth(idp);
    }
    return this._instance;
  }

  getToken = () => {
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

  logout = () => {
    switch (this._idp) {
      case 'facebook':
        LoginManager.logOut();
        break;
      default:
        break;
    }
  };

  login = (): Promise<boolean> => {
    switch (this._idp) {
      case 'facebook':
        return LoginManager.logInWithPermissions(['public_profile', 'email']).then(token =>
          token.error || token.isCancelled ? Promise.resolve(false) : Promise.resolve(true),
        );
      default:
        return Promise.resolve(false);
    }
  };

  getUserId = () => {
    switch (this._idp) {
      case 'facebook':
        return AccessToken.getCurrentAccessToken().then(token => Promise.resolve(token?.getUserId()));
      default:
        return Promise.reject();
    }
  };
}
