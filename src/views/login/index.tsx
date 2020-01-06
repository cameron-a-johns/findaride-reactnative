import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../../utilities/theme';

export const LoginView: React.FC = () => {
  const themeContext = useContext(ThemeContext);

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
      backgroundColor: themeContext?.colors.background,
    },
    login: {
      color: themeContext?.colors.primary,
    },
  });

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Text style={styles.login}>Login</Text>
          <TouchableOpacity onPress={() => themeContext?.swap() || console.log('void')}>
            <Icon name="alarm" />
          </TouchableOpacity>
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
