import React from 'react';
import { Route, withRouter, Switch } from 'react-router-native';
import { LoginView, HomeView } from '../views';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/home" component={HomeView} />
      <Route path="/" component={withRouter(LoginView)} />
    </Switch>
  );
};
