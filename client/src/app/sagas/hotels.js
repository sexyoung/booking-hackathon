import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';

import {
  HOTEL_GET_LIST,
} from 'constants/hotelActionTypes';

import {
  setList,
} from 'actions/hotelActions';

import {
    hotelsApiURL,
} from 'constants/apis';

import {
    getApi,
} from 'utils/api';

function* doGetHotels({ payload }) {
  const result = yield call(
    getApi,
    `${hotelsApiURL()}?lat=${payload.lat}&lng=${payload.lng}&radius=${payload.radius}`
  );
  yield put(setList(result));
}

export function* watchGetHotels() {
  yield takeLatest(HOTEL_GET_LIST, doGetHotels);
}

export default {
  watchGetHotels,
};
