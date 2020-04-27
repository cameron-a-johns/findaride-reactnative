import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider, ApiContext, ApiClient } from '../utilities';
import { store, history } from '../store';
import { Routes } from './routes';
import { Navigation } from '../components/navigation';

const client = new ApiClient('dev');

export const App = () => {
  return (
    <ApiContext.Provider value={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider>
            <View>
              <Routes />
              <Navigation />
            </View>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </ApiContext.Provider>
  );
};
