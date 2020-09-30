import { AccessToken, LoginManager } from 'react-native-fbsdk';
import SyncStorage from 'sync-storage';
import { config } from '../../config/environment';
import { StorageKeys } from '../../utilities/const';
import { FacebookIdp } from './providers/Facebook';
import { Idp } from './providers/Idp';

const IDPMapper = {
  facebook: () => new FacebookIdp(),
};

export type IDPType = keyof typeof IDPMapper;

const storedClient = () => {
  try {
    const val = SyncStorage.get(StorageKeys.idp) as IDPType;
    return val ?? undefined;
  } catch {
    return undefined;
  }
};

export class AuthService {
  private _idp?: Idp;

  constructor(idp?: IDPType) {
    if (idp) {
      this._idp = IDPMapper[idp]();
      SyncStorage.set(StorageKeys.idp, idp);
      return;
    }

    const stored = storedClient();
    if (stored) {
      this._idp = IDPMapper[stored]();
    }
  }

  setIdp = (idp: IDPType) => {
    this._idp = IDPMapper[idp]();
  }

  getToken = () => {
    return this._idp?.getToken();
  };

  getAppId = () => {
    return config.clientId;
  };

  logout = () => {
    return this._idp.logout();
  };

  login = (): Promise<boolean> => {
    return this._idp.login();
  };

  getUserId = () => {
    return this._idp.getUserId();
  };
}
