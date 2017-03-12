import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './appReducer';
import map from './mapReducer';
import hotel from './hotelReducer';
import attraction from './attractionReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
  app,
  map,
  hotel,
  attraction,
  routing
});

export default rootReducer;
