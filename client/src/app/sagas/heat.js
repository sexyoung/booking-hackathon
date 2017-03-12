import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';

import {
  HEAT_GET_LIST,
} from 'constants/heatActionTypes';

import {
  setLoading,
  setList,
} from 'actions/heatActions';

import {
    heatsApiURL,
} from 'constants/apis';

import {
    getApi,
} from 'utils/api';

function* doGetHeats({ payload }) {
  try {
    yield put(setLoading(true));
    const result = yield call(
      getApi,
      `${heatsApiURL()}?lat=${payload.lat}&lng=${payload.lng}&radius=${payload.radius}`
    );
    yield put(setList(result));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchGetHeats() {
  yield takeLatest(HEAT_GET_LIST, doGetHeats);
}

export default {
  watchGetHeats,
};
