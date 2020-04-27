import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { Auth } from '../utilities';

export const ProtectedRoute: React.FC<RouteProps> = ({ path, component }: RouteProps) => {
  const auth = Auth.getInstance()?.getToken();

  return auth ? <Route path={path} component={component} /> : <Redirect to="/" />;
};
