import Immutable from 'immutable';
import {
  SET_LIST,
  SET_INDEX,
  SET_LOADING,
} from 'constants/attractionActionTypes';

const initialState = Immutable.fromJS({
  list: [],
  index: -1,
  loading: false,
});

export default function attractionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return state.set('index', action.payload);
    case SET_LIST:
      return state.set('list', action.payload);
    case SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}
