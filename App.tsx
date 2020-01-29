import React from 'react';
import { Provider } from 'react-redux';

import { PlacesNavigator } from './src/navigation/PlacesNavigator';
import { store } from './src/redux/store';
import { initDatabase } from './src/db/db';

initDatabase();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
