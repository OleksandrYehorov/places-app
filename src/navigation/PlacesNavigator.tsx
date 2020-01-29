import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { PlacesListScreen } from '../screens/PlacesListScreen';
import { PlaceDetailsScreen } from '../screens/PlaceDetailsScreen';
import { NewPlaceScreen } from '../screens/NewPlaceScreen';
import { MapScreen } from '../screens/MapScreen';
import { COLORS } from '../utils/constants';

const navigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetails: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    initialRouteName: 'Places',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary,
    },
  },
);

export const PlacesNavigator = createAppContainer(navigator);
