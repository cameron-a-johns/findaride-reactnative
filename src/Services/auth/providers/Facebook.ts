import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Idp } from './Idp';

export class FacebookIdp extends Idp {
    getToken(): Promise<string | undefined> {
        return AccessToken
            .getCurrentAccessToken()
            .then(result => result?.accessToken);
    }
    login(): Promise<boolean> {
        return LoginManager.logInWithPermissions(['public_profile', 'email']).then(token =>
            token.error || token.isCancelled ? Promise.resolve(false) : Promise.resolve(true),
          );
    }
    logout(): Promise<boolean> {
        LoginManager.logOut();

        return new Promise((resolve => resolve(true)));
    }
    getUserId(): Promise<string | undefined> {
        return AccessToken
            .getCurrentAccessToken()
            .then(token => Promise.resolve(token?.getUserId()));
    }
    
}