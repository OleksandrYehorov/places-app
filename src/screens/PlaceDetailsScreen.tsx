import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { AppState } from '../redux/types';
import { Place } from '../models/place';

export interface PlaceDetailsScreenParams {
  placeId?: number;
  placeTitle?: string;
}

export const PlaceDetailsScreen: NavigationStackScreenComponent<PlaceDetailsScreenParams> = ({
  navigation,
}) => {
  const placeId = navigation.getParam('placeId');
  const place = useSelector<AppState, Place | undefined>(({ places }) =>
    places.places.find(({ id }) => id === placeId),
  );

  if (!place) {
    navigation.goBack();
    return (
      <View style={styles.container}>
        <Text>Not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{place.title}</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('placeTitle'),
});

const styles = StyleSheet.create({
  container: {},
});
