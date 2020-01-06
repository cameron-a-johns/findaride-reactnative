import React from 'react';
import { Switch, Route, NativeRouter } from 'react-router-native';
import App from '../../App';
import { LoginView } from '../views/login';
import { ThemeProvider } from '../utilities/theme';

export const routes = () => {
  return (
    <ThemeProvider>
      <NativeRouter>
        <Switch>
          <Route path="/" component={LoginView} />
          <Route path="/app" component={App} />
        </Switch>
      </NativeRouter>
    </ThemeProvider>
  );
};
