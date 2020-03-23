import { AccessToken } from 'react-native-fbsdk';
import { config } from '../config/environment';

type idP = 'facebook';

export interface AuthProvider {
  getToken: (type: idP) => Promise<string>;
  getAppId: () => string;
}
export class Auth implements AuthProvider {
  getToken = (type: idP) => {
    switch (type) {
      case 'facebook':
        return AccessToken.getCurrentAccessToken().then(result => result?.accessToken);
      default:
        return 'Unknown provider type';
    }
  };

  getAppId = () => {
    return config.clientId;
  };
}
