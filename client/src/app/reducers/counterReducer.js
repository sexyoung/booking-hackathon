import ActionTypes from 'constants/ActionTypes';
import InitialState from 'constants/InitialState';

/**
 * Template reducer, increment state
 */
export default function counterReducer(state = InitialState.counter, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE:
      return state + 1;

    case ActionTypes.PLACEHOLDER:
      return state + action.inc;

    default:
      return state;
  }
}
