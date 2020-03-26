import React from 'react';
import { NativeRouter, Switch } from 'react-router-native';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider, ApiContext, ApiClient, Auth } from '../utilities';
import { store } from '../store';
import { Routes } from './routes';

const authProvider = new Auth();
authProvider.idp = 'facebook'; // TODO: remove hard coded idp
const client = ApiClient.getInstance('dev', authProvider);

export const App = () => {
  return (
    <ThemeProvider>
      <ApiContext.Provider value={client}>
        <Provider store={store}>
          <NativeRouter>
            <View>
              <Switch>
                <Routes />
              </Switch>
            </View>
          </NativeRouter>
        </Provider>
      </ApiContext.Provider>
    </ThemeProvider>
  );
};
