import { fromJS } from 'immutable';
import {
  APP_SET_VALUE,
} from 'constants/appActionTypes';

const initialState = fromJS({
  heatChecked:    true,
  scenaryChecked: true,
  hotelChecked:   false,
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_SET_VALUE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
