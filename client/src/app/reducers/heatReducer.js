import { fromJS, List } from 'immutable';
import {
  HEAT_SET_LIST,
  HEAT_SET_LOADING,
} from 'constants/heatActionTypes';

const initialState = fromJS({
  list: List(),
  index: -1,
  loading: false,
});

export default function heatReducer(state = initialState, action) {
  switch (action.type) {
    case HEAT_SET_LIST:
      return state.merge({ 'list': action.payload });
    case HEAT_SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state;
  }
}
