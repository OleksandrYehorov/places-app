import { Action } from 'redux';

import { Place } from '../../models/place';
import { Location } from '../../types';

export interface PlacesState {
  places: Place[];
}

export interface AddPlaceAction extends Action<'ADD_PLACE'> {
  placeData: {
    id: number;
    title: string;
    imageUri: string;
    address: string;
    location: Location;
  };
}

export interface SetPlacesAction extends Action<'SET_PLACES'> {
  places: Place[];
}

export type PlacesAction = AddPlaceAction | SetPlacesAction;
