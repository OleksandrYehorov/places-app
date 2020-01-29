import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

import { COLORS } from '../utils/constants';
import { addPlaceAction } from '../redux/places/actions';
import { ImageSelect } from '../components/ImageSelect';
import { LocationSelect } from '../components/LocationSelect';
import { Location } from '../types';

export interface NewPlaceScreenParams {
  selectedLocation?: Location;
}

export const NewPlaceScreen: NavigationStackScreenComponent<NewPlaceScreenParams> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();

  const savePlaceHandler = () => {
    if (selectedImage && selectedLocation) {
      dispatch(addPlaceAction(titleValue, selectedImage, selectedLocation));

      navigation.navigate('Places');
    }
  };

  const saveButtonDisabled = titleValue.trim().length === 0 || !selectedImage || !selectedLocation;

  return (
    <ScrollView>
      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          style={styles.textInput}
          value={titleValue}
          onChangeText={setTitleValue}
        />
        <ImageSelect onTakeImage={setSelectedImage} />
        <LocationSelect navigation={navigation} onLocationSelect={setSelectedLocation} />
        <Button
          title="Save Place"
          color={COLORS.primary}
          onPress={savePlaceHandler}
          disabled={saveButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {},
  title: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
});
