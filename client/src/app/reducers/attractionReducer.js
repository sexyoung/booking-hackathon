import { fromJS, List } from 'immutable';
import {
  ATTRACTION_SET_LIST,
  ATTRACTION_SET_INDEX,
  ATTRACTION_SET_LOADING,
} from 'constants/attractionActionTypes';

const initialState = fromJS({
  list: List(),
  index: -1,
  loading: false,
});

export default function attractionReducer(state = initialState, action) {
  switch (action.type) {
    case ATTRACTION_SET_INDEX:
      return state.set('index', action.payload);
    case ATTRACTION_SET_LIST:
      return state.merge({ 'list': action.payload });
    case ATTRACTION_SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}
