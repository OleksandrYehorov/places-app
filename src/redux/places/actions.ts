import { documentDirectory, moveAsync } from 'expo-file-system';

import { ThunkResult } from '../types';
import { insertPlace, fetchPlaces } from '../../db/db';
import { Place } from '../../models/place';
import { config } from '../../../config';
import { Location } from '../../types';

import { AddPlaceAction, SetPlacesAction } from './types';

export const addPlaceAction = (
  title: string,
  imageUri: string,
  location: Location,
): ThunkResult<Promise<AddPlaceAction>> => async dispatch => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${config.googleApiKey}`,
  );

  if (!response.ok) {
    throw new Error('Unable to get the address.');
  }

  const data = await response.json();

  const address: string = data.results[0].formatted_address;

  const fileName = imageUri.split('/').pop();
  const newPath = `${documentDirectory}${fileName}`;

  await moveAsync({
    from: imageUri,
    to: newPath,
  });
  const { insertId } = await insertPlace(
    title,
    newPath,
    address,
    location.latitude,
    location.longitude,
  );

  return dispatch({
    type: 'ADD_PLACE',
    placeData: {
      id: insertId,
      title,
      imageUri: newPath,
      address,
      location,
    },
  });
};

export const fetchPlacesAction = (): ThunkResult<Promise<SetPlacesAction>> => async dispatch => {
  const dbResult = await fetchPlaces();
  const places: Place[] = [];

  for (let i = 0; i < dbResult.rows.length; i++) {
    const { id, imageUri, title, address, location } = dbResult.rows.item(i) as Place;
    const place = new Place(id, title, imageUri, address, location);

    places.push(place);
  }

  return dispatch({
    type: 'SET_PLACES',
    places,
  });
};
