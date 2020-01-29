import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, Alert, ActivityIndicator } from 'react-native';
import { getCurrentPositionAsync } from 'expo-location';
import { askAsync, PermissionStatus, LOCATION } from 'expo-permissions';
import { NavigationStackProp } from 'react-navigation-stack';

import { COLORS } from '../utils/constants';
import { Location } from '../types';
import { NewPlaceScreenParams } from '../screens/NewPlaceScreen';

import { MapPreview } from './MapPreview';

interface Props {
  navigation: NavigationStackProp<any, NewPlaceScreenParams>;
  onLocationSelect: (location: Location) => void;
}

export const LocationSelect: React.FC<Props> = ({ navigation, onLocationSelect }) => {
  const [fetching, setFetching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();

  const selectedLocationParam = navigation.getParam('selectedLocation');

  useEffect(() => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  }, [onLocationSelect, selectedLocation]);

  useEffect(() => {
    if (selectedLocationParam) {
      setSelectedLocation(selectedLocationParam);
    }
  }, [selectedLocationParam]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setFetching(true);
      const location = await getCurrentPositionAsync({
        timeInterval: 2000,
      });

      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        'Could nor fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }],
      );
    }
    setFetching(false);
  };

  const pickOnMapHandler = () => navigation.navigate('Map');

  const verifyPermissions = async () => {
    const { status } = await askAsync(LOCATION);

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }],
      );

      return false;
    }

    return true;
  };

  return (
    <View style={styles.locationSelect}>
      <MapPreview style={styles.mapPreview} location={selectedLocation} onPress={pickOnMapHandler}>
        {fetching ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button title="Get Current Location" color={COLORS.primary} onPress={getLocationHandler} />
        <Button title="Pick On Map" color={COLORS.primary} onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelect: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
