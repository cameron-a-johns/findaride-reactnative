import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { RouteComponentProps } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext, ApiContext, UserApi, RouteTable, Auth } from '../../utilities';

export const LoginView: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const themeContext = useContext(ThemeContext);
  const userApi = new UserApi(useContext(ApiContext));
  const auth = Auth.getInstance();

  useEffect(() => {
    auth.getToken().then(token => {
      if (token) {
        // TODO: check user exists, fast query
        // TODO: load user profile, slow
        history.push(RouteTable.home);
      }
    });
  }, []);

  const addUser = () => {
    auth.getUserId().then(userId => {
      if (userId) {
        userApi
          .addNewUser(userId)
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

  const handleLogin = () => {
    auth
      .login()
      .then(result => {
        if (result) {
          addUser();
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
    width: ${Dimensions.get('window').width * 0.7};
    margin: 0 auto;
  `;

  const styles = StyleSheet.create({
    row: {
      height: Dimensions.get('window').height / 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
      <Wrapper>
        <Row>
          <HeaderWrapper>
            <Icon name="theme-light-dark" type="material-community" onPress={() => themeContext?.swap()} />
          </HeaderWrapper>
        </Row>
        <Row style={styles.row}>
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
