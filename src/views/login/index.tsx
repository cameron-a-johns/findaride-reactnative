import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';
import { ThemeContext, RideApi, ApiContext } from '../../utilities';

export const LoginView: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const rideApi = new RideApi(useContext(ApiContext));
  const [temp, setTemp] = useState('');

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
          <Button
            onPress={() => rideApi.getRidesForUser('rides/time').then(val => setTemp(val))}
            title={temp || 'clickme'}
          />
        </Row>
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
              alert(`Login was successful with permissions: ${result.grantedPermissions}`);
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </>
  );
};
