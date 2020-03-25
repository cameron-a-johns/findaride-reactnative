import React from 'react';
import { Route, NativeRouter, Switch, withRouter } from 'react-router-native';
import { View } from 'react-native';
import App from '../../App';
import { LoginView, HomeView } from '../views';
import { ThemeProvider, ApiContext, ApiClient, Auth } from '../utilities';

const authProvider = new Auth();
authProvider.idp = 'facebook'; // TODO: remove hard coded idp
const client = new ApiClient('dev', authProvider);

export const routes = () => {
  return (
    <ThemeProvider>
      <ApiContext.Provider value={client}>
        <NativeRouter>
          <View>
            <Switch>
              <Route path="/app" component={App} />
              <Route path="/home" component={HomeView} />
              <Route path="/" component={withRouter(LoginView)} />
            </Switch>
          </View>
        </NativeRouter>
      </ApiContext.Provider>
    </ThemeProvider>
  );
};
