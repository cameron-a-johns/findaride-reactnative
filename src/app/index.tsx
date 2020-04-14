import React from 'react';
import { NativeRouter } from 'react-router-native';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider, ApiContext, ApiClient, Auth } from '../utilities';
import { store } from '../store';
import { Routes } from './routes';
import { Navigation } from '../components/navigation';

const authProvider = Auth.getInstance('facebook'); // TODO: remove hard coded idp
const client = new ApiClient('dev', authProvider);

export const App = () => {
  return (
    <ThemeProvider>
      <ApiContext.Provider value={client}>
        <Provider store={store}>
          <NativeRouter>
            <View>
              <Routes />
              <Navigation />
            </View>
          </NativeRouter>
        </Provider>
      </ApiContext.Provider>
    </ThemeProvider>
  );
};
