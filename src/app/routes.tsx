import React from 'react';
import {Switch, Route} from 'react-router-native';
import App from '../../App';
import {LoginView} from '../views/login';

export const routes = () => {
  return (
    <Switch>
      <Route path="/" component={LoginView} />
      <Route path="/app" component={App} />
    </Switch>
  );
};
