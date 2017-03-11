import {
  SET_TODOS,
  ADD_TODO,
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DESTOLY_TODO,
} from 'constants/TodoActionTypes';

export const setTodos = payload => ({ type: SET_TODOS, payload });

export const addTodo  = payload => ({ type: ADD_TODO, payload });

export const getTodos = () => ({ type: GET_TODOS });

export const create   = payload => ({ type: CREATE_TODO, payload });

export const update   = payload => ({ type: UPDATE_TODO, payload });

export const remove   = payload => ({ type: DESTOLY_TODO, payload });

const TodoActions = {
  setTodos,
  addTodo,
  getTodos,
  create,
  update,
  remove,
};

export default TodoActions;
