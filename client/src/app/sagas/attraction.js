// import {
//   put,
//   call,
//   takeLatest,
// } from 'redux-saga/effects';
//
// import {
//   GET_LIST,
// } from 'constants/attractionActionTypes';
//
// import {
//   setList,
// } from 'actions/attractionActions';
//
// import {
//     todosApiURL,
// } from 'constants/apis';
//
// import {
//     getApi,
// } from 'utils/api';
//
// function* doGetTodos() {
//   const result = yield call(
//     getApi,
//     todosApiURL()
//   );
//   yield put(setTodos(result));
// }
//
// function* doCreateTodo({ payload }) {
//   const result = yield call(
//     postApi,
//     todosApiURL(),
//     payload
//   );
//   yield put(addTodo(result));
// }
//
// export function* watchGetTodos() {
//   yield takeLatest(GET_TODOS, doGetTodos);
// }
//
// export function* watchCreateTodo() {
//   yield takeLatest(CREATE_TODO, doCreateTodo);
// }
//
// export default {
//   watchGetTodos,
//   watchCreateTodo,
// };
