import Immutable from 'immutable';
import {
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DESTOLY_TODO,
} from 'constants/TodoActionTypes';

const initialState = Immutable.List();

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.push(action.payload);
    case SET_TODOS:
    case UPDATE_TODO:
      return state.merge(action.payload);
    case DESTOLY_TODO:
      return state.delete(action.payload.id);
    default:
      return state;
  }
}
