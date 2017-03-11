import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import map from './mapReducer';
import hotel from './hotelReducer';
import attraction from './attractionReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
  map,
  hotel,
  attraction,
  routing
});

export default rootReducer;
