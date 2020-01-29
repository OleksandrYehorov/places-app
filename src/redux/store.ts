import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { placesReducer } from './places/reducer';
import { AppState, AppAction } from './types';

const rootReducer = combineReducers<AppState>({
  places: placesReducer,
});

export const store = createStore(rootReducer, applyMiddleware<AppState, AppAction>(thunk));
