import { Reducer } from 'redux';

import { Place } from '../../models/place';

import { PlacesState, PlacesAction } from './types';

const initialState: PlacesState = {
  places: [],
};

export const placesReducer: Reducer<PlacesState, PlacesAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLACE': {
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.location,
      );

      return {
        ...state,
        places: [...state.places, newPlace],
      };
    }
    case 'SET_PLACES': {
      return {
        ...state,
        places: action.places,
      };
    }
    default: {
      return state;
    }
  }
};
