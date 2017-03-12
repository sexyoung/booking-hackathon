import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './appReducer';
import map from './mapReducer';
import hotel from './hotelReducer';
import heat from './heatReducer';
import attraction from './attractionReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
  app,
  map,
  hotel,
  heat,
  attraction,
  routing
});

export default rootReducer;
