import { useEffect, useRef } from 'react';
import { SyncStorage } from 'sync-storage';
import { AuthService, IDPType, StorageKeys } from '../utilities';
import { Context } from './helper';

interface AuthStore {
    client?: AuthService;
    setIdp: (idp: IDPType) => void;
}

const storedClient = () => {
    try {
      const val = SyncStorage.get(StorageKeys.idp) as IDPType;
      return val ?? undefined;
    } catch {
      return undefined;
    }
  };

const [useAuth, AuthProvider] = Context.create<AuthStore>();

const AuthContext: React.FC = ({children}) => {
    const authService = useRef<AuthService | undefined>(undefined);

    useEffect(() => {
        const stored = storedClient();

        if (stored) {
            authService.current = new AuthService(stored);
        }
    }, [storedClient]);

    return <AuthProvider value={{
        client: authService.current,
        setIdp: (idp: IDPType) => {
            SyncStorage.set(StorageKeys.idp, idp);
            authService.current = new AuthService(idp);
        }
    }}>{children}</AuthProvider>
}