import React from 'react';
import { Switch, Route, NativeRouter } from 'react-router-native';
import App from '../../App';
import { LoginView } from '../views/login';
import { ThemeProvider } from '../utilities/theme';
import { ApiContext, ApiClient } from '../utilities/api';

const client = new ApiClient('dev');

export const routes = () => {
  return (
    <ThemeProvider>
      <ApiContext.Provider value={client}>
        <NativeRouter>
          <Switch>
            <Route path="/" component={LoginView} />
            <Route path="/app" component={App} />
          </Switch>
        </NativeRouter>
      </ApiContext.Provider>
    </ThemeProvider>
  );
};
