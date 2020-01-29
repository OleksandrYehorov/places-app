import React, { useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { HeaderButton } from '../components/HeaderButton';
import { useSelector } from '../redux/useSelector';
import { PlaceItem } from '../components/PlaceItem';
import { fetchPlacesAction } from '../redux/places/actions';

import { PlaceDetailsScreenParams } from './PlaceDetailsScreen';

export const PlacesListScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);

  useEffect(() => {
    dispatch(fetchPlacesAction());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => String(id)}
      renderItem={({ item }) => (
        <PlaceItem
          image={item.imageUri}
          title={item.title}
          address={item.address}
          onSelect={() => {
            const params: PlaceDetailsScreenParams = {
              placeId: item.id,
              placeTitle: item.title,
            };

            navigation.navigate('PlaceDetails', params);
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'All Places',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add Place"
        iconName={Platform.select({ ios: 'ios-add', android: 'md-add' })}
        onPress={() => navigation.navigate('NewPlace')}
      />
    </HeaderButtons>
  ),
});
