import React, { useEffect, useState } from 'react';
import { View, Text, Button, Dimensions, PermissionsAndroid } from 'react-native';
import { RouteComponentProps } from 'react-router';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Auth } from '../../utilities';

export const HomeView: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [currentPos, setCurrentPos] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const auth = Auth.getInstance();

  const handleLogout = () => {
    auth && auth.logout();
    history.push('/');
  };

  const getPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Grant access to your location',
        message: 'FindARide needs access to your location so you can find rides close to you.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      setLocationAllowed(granted === PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(pos => {
          console.log(pos.coords);
          setCurrentPos({ ...currentPos, latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Text>Home boi</Text>
      <Button onPress={() => handleLogout()} title="logout" />
      <MapView region={currentPos} style={{ width: '100%', height: '100%' }} />
    </View>
  );
};
