import React from 'react';
import { Route, withRouter } from 'react-router-native';
import { LoginView, HomeView } from '../views';

export const Routes = () => {
  return (
    <>
      <Route path="/home" component={HomeView} />
      <Route path="/" component={withRouter(LoginView)} />
    </>
  );
};
