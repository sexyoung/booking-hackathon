import Immutable from 'immutable';
import {
  HOTEL_SET_LIST,
  HOTEL_SET_INDEX,
  HOTEL_SET_LOADING,
} from 'constants/hotelActionTypes';

const initialState = Immutable.fromJS({
  list: [],
  index: -1,
});

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case HOTEL_SET_INDEX:
      return state.set('index', action.payload);
    case HOTEL_SET_LIST:
      return state.set('list', action.payload);
    case HOTEL_SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}
