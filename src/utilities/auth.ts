import { AccessToken } from 'react-native-fbsdk';

type idP = 'facebook';

export interface AuthProvider {
  getToken: (type: idP) => Promise<string>;
  getAppId: (clientId: string) => string;
}
export class Auth implements AuthProvider {
  getToken = async (type: idP) => {
    switch (type) {
      case 'facebook':
        return AccessToken.getCurrentAccessToken().then(result => result?.accessToken);
      default:
        return 'Unknown provider type';
    }
  };
}
