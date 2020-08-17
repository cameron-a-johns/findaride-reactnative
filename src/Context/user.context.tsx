import React from 'react';
import { LocalStorage } from '../Services/localStorage';

interface UserStore {
  token?: string;
}

export const { Consumer: UserStore, Provider: UserProvider } = React.createContext<UserStore | undefined>(undefined);

export const UserContext: React.FC = ({ children }) => {
  return <UserProvider value={{ token: LocalStorage.Get('user') }}>{children}</UserProvider>;
};
