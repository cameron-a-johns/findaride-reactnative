import { useRef } from 'react';
import { SyncStorage } from 'sync-storage';
import { AuthService, IDPType } from '../services/auth';
import { StorageKeys } from '../utilities';
import { Context } from './helper';

interface AuthStore {
    login: (idp: IDPType) => Promise<boolean>;
    logout: () => void;
}

const [useAuth, AuthProvider] = Context.create<AuthStore>();

const AuthContext: React.FC = ({children}) => {
    const authService = useRef<AuthService>(new AuthService());

    return <AuthProvider value={{
        login: (idp: IDPType) => {
            SyncStorage.set(StorageKeys.idp, idp);
            
            authService.current.setIdp(idp);
            return authService.current.login();
        },
        logout: async () => {
            if (await authService.current.logout()) {
                SyncStorage.clear(StorageKeys.idp);
                authService.current.clearIdp();
            }
        }
    }}>{children}</AuthProvider>
}

export { AuthContext, useAuth };