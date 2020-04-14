import React from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import { RouteComponentProps } from 'react-router-native';
import { Auth } from '../../utilities';

export const HomeView: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const auth = Auth.getInstance();

  const handleLogout = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Text>Home boi</Text>
      <Button onPress={() => handleLogout()} title="logout" />
    </View>
  );
};
