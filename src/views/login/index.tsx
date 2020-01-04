import React from 'react';
import { View, Text } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export const LoginView: React.FC = () => {
  return (
    <>
      {console.log('test')}
      <View>
        <Text>Login</Text>
        <LoginButton
          publishPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            console.log('login finished');
            if (error) {
              alert('Login failed with error: ' + error.message);
            } else if (result.isCancelled) {
              alert('Login was cancelled');
            } else {
              console.log(result);
              alert('Login was successful with permissions: ' + result.grantedPermissions);
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    </>
  );
};
