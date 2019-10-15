import React from 'react';
import {View, Text} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

export const LoginView: React.FC = () => {
  return (
    <>
      <View>
        <Text>Login</Text>
        <LoginButton
          permissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                data && console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </>
  );
};
