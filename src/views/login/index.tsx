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
          permissions={['public_profile']}
          onLoginFinished={(error, result) => {
            console.log('login finished');
            if (error) {
              console.log(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              console.log(result);
              alert('Login was successful with permissions: ' + result.grantedPermissions);
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </>
  );
};
