import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { RouteComponentProps } from 'react-router';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext, ApiContext, UserApi, RouteTable, Auth } from '../../utilities';
import { LocalStorage } from '../../Services/localStorage';

export const LoginView: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const themeContext = useContext(ThemeContext);
  const userApi = new UserApi(useContext(ApiContext));
  const auth = Auth.getInstance();

  useEffect(() => {
    auth &&
      auth.getToken().then(token => {
        if (token) {
          // TODO: check user exists, fast query
          // TODO: load user profile, slow
          history.push(RouteTable.home);
        }
      });
  }, []);

  const addUser = (newAuth: Auth) => {
    newAuth.getUserId().then(userId => {
      if (userId) {
        LocalStorage.Set('user', userId);
        userApi
          .addNewUser(userId)
          .then(result => {
            if (!result.isErr) {
              history.push('/home');
            }
          })
          .catch(e => console.log(e));
      }
    });
  };

  const handleLogin = () => {
    const newAuth = Auth.getInstance('facebook');
    newAuth &&
      newAuth
        .login()
        .then(result => {
          if (result) {
            addUser(newAuth);
          }
        })
        .catch(error => {
          Alert.alert('Error logging in', error);
        });
  };

  const Wrapper = styled.View`
    background-color: ${themeContext?.colors.background};
    height: 100%;
  `;

  const Row = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `;

  const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin: 10px;
  `;

  const LoginWrapper = styled.View`
    width: ${Dimensions.get('window').width * 0.7}px;
    margin: 0 auto;
  `;

  return (
    <>
      <Wrapper>
        <Row>
          <HeaderWrapper>
            <Icon name="theme-light-dark" type="material-community" onPress={() => themeContext?.swap()} />
          </HeaderWrapper>
        </Row>
        <Row>
          <Icon name="bike" type="material-community" color={themeContext?.colors.primary} size={100} />
          <Icon name="plus" type="material-community" />
          <Icon name="account-group" type="material-community" color={themeContext?.colors.primary} size={100} />
        </Row>
        <LoginWrapper>
          <Button
            style={{ width: '110px' }}
            onPress={() => handleLogin()}
            title="Continue with Facebook"
            icon={<Icon name="facebook" type="material-community" color="white" size={20} />}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4c669f', '#3b5998', '#192f6a'],
            }}
          />
        </LoginWrapper>
      </Wrapper>
    </>
  );
};
