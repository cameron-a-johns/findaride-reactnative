import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet, Dimensions, Alert, Button } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';
import { RouteComponentProps } from 'react-router-native';
import { ThemeContext, ApiContext, UserApi } from '../../utilities';

export const LoginView: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const themeContext = useContext(ThemeContext);
  const userApi = new UserApi(useContext(ApiContext));

  const addUser = () => {
    AccessToken.getCurrentAccessToken().then(token => {
      if (token) {
        userApi
          .addNewUser(token.userID)
          .then(result => {
            console.log(result);
            if (!result.isErr) {
              history.push('/home');
            }
          })
          .catch(e => console.log(e));
      }
    });
  };

  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          addUser();
        }
      })
      .catch(error => {
        Alert.alert('Error logging in', error);
      });
  };

  const Row = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${themeContext?.colors.background};
  `;

  const HeaderWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      height: Dimensions.get('window').height / 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      height: 150,
    },
    login: {
      color: themeContext?.colors.primary,
      textTransform: 'uppercase',
    },
  });

  return (
    <>
      <View style={styles.wrapper}>
        <Row>
          <HeaderWrapper>
            <Icon name="theme-light-dark" type="material-community" size={150} onPress={() => themeContext?.swap()} />
            <Text style={styles.login}>Login</Text>
          </HeaderWrapper>
        </Row>
        <Button onPress={() => handleFacebookLogin()} title="Continue with Facebook" color="#3B5998" />
        <LoginButton
          permissions={['public_profile']}
          onLoginFinished={(error, result) => {
            console.log('login finished');
            if (error) {
              console.log(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              console.log(result);
              addUser();
              console.log('finished');
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </>
  );
};
