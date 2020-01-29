import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import MapView, { Marker, Region } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Location } from '../types';
import { HeaderButton } from '../components/HeaderButton';

import { NewPlaceScreenParams } from './NewPlaceScreen';

export interface MapScreenParams {
  saveLocationHandler?: () => void;
}

const initialRegion: Region = {
  latitude: 37.78,
  longitude: -122.43,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const MapScreen: NavigationStackScreenComponent<MapScreenParams> = ({ navigation }) => {
  const [location, setLocation] = useState<Location | undefined>();
  const prevLocation = usePrevious(location);

  useEffect(() => {
    if (location !== prevLocation) {
      if (!location) {
        navigation.setParams({ saveLocationHandler: undefined });
        return;
      }

      const saveLocationHandler = () => {
        const params: NewPlaceScreenParams = {
          selectedLocation: location,
        };

        navigation.navigate('NewPlace', params);
      };

      navigation.setParams({ saveLocationHandler });
    }
  }, [location, navigation, prevLocation]);

  return (
    <MapView
      style={styles.map}
      region={initialRegion}
      provider="google"
      onPress={({ nativeEvent }) => {
        setLocation(nativeEvent.coordinate);
      }}
    >
      {location && <Marker coordinate={location} />}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => {
    const saveLocationHandler = navigation.getParam('saveLocationHandler');

    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" onPress={saveLocationHandler} />
      </HeaderButtons>
    );
  },
});

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
