import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

import { AppState } from './types';

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
