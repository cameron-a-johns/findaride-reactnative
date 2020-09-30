import SyncStorage from 'sync-storage';
import { config } from '../../config/environment';
import { resolveOrFallback, StorageKeys } from '../../utilities';
import { FacebookIdp, Idp } from './providers';

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

  clearIdp = () => this._idp = undefined;

  getToken = () => {
    return resolveOrFallback(this._idp?.getToken(), undefined);
  };

  getAppId = () => {
    return config.clientId;
  };

  logout = () => {
    return resolveOrFallback(this._idp?.logout(), false);
  };

  login = (): Promise<boolean> => {
    return resolveOrFallback(this._idp?.login(), false);
  };

  getUserId = () => {
    return resolveOrFallback(this._idp?.getUserId(), undefined);
  };
}
