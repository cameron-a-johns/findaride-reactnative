import React from 'react';
import { Switch, Route, NativeRouter } from 'react-router-native';
import App from '../../App';
import { LoginView, HomeView } from '../views';
import { ThemeProvider, ApiContext, ApiClient, Auth } from '../utilities';

const authProvider = new Auth();
const client = new ApiClient('dev', authProvider);

export const routes = () => {
  return (
    <ThemeProvider>
      <ApiContext.Provider value={client}>
        <NativeRouter>
          <Switch>
            <Route path="/" component={LoginView} />
            <Route path="/home" component={HomeView} />
            <Route path="/app" component={App} />
          </Switch>
        </NativeRouter>
      </ApiContext.Provider>
    </ThemeProvider>
  );
};
