import { ThunkAction } from 'redux-thunk';

import { PlacesState, PlacesAction } from './places/types';

export interface AppState {
  places: PlacesState;
}

export type AppAction = PlacesAction;

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppAction>;
