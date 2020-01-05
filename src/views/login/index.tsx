import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

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
});

export const LoginView: React.FC = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text>Login</Text>
        </View>
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
