import {
  watchGetAttractions,
} from './attraction';

import {
  watchGetHotels
} from './hotels'

export default function* rootSaga() {
  yield [
    watchGetAttractions(),
    watchGetHotels(),
  ];
}
