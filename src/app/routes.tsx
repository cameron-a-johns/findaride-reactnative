import React from 'react';
import { Route, Switch } from 'react-router';
import { LoginView, HomeView } from '../views';
import { ProtectedRoute } from '../components/protectedRoute';

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/home" component={HomeView} />
      <Route path="/" component={LoginView} />
    </Switch>
  );
};
