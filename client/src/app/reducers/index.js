import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import counter from './counterReducer';
import todos from './todoReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
  counter,
  todos,
  routing
});

export default rootReducer;
