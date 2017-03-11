import Immutable from 'immutable';
import {
  SET_ZOOM,
  SET_LOCATION,
} from 'constants/mapActionTypes';

const initialState = Immutable.fromJS({
  zoom:     null,
  location: {},
});

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ZOOM:
      return state.set('zoom', action.payload);
    case SET_LOCATION:
      return state.set('location', action.payload);
    default:
      return state;
  }
}
