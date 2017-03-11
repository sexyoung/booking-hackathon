import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';

import {
  ATTRACTION_GET_LIST,
} from 'constants/attractionActionTypes';

import {
  setList,
} from 'actions/attractionActions';

import {
    attractionsApiURL,
} from 'constants/apis';

import {
    getApi,
} from 'utils/api';

function* doGetAttractions({ payload }) {
  const result = yield call(
    getApi,
    `${attractionsApiURL()}?lat=${payload.lat}&lng=${payload.lng}&radius=${payload.radius}`
  );
  yield put(setList(result));
}

export function* watchGetAttractions() {
  yield takeLatest(ATTRACTION_GET_LIST, doGetAttractions);
}

export default {
  watchGetAttractions,
};
