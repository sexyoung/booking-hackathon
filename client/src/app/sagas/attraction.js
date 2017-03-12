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
  setLoading,
} from 'actions/attractionActions';

import {
    attractionsApiURL,
} from 'constants/apis';

import {
    getApi,
} from 'utils/api';

function* doGetAttractions({ payload }) {
  try {
    yield put(setLoading(true));
    const result = yield call(
      getApi,
      `${attractionsApiURL()}?lat=${payload.lat}&lng=${payload.lng}&radius=${payload.radius}`
    );
    yield put(setList(result));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchGetAttractions() {
  yield takeLatest(ATTRACTION_GET_LIST, doGetAttractions);
}

export default {
  watchGetAttractions,
};
