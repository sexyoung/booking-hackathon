import {
  watchGetAttractions,
} from './attraction';

import {
  watchGetHotels
} from './hotels';

import {
  watchGetHeats
} from './heat';

export default function* rootSaga() {
  yield [
    watchGetAttractions(),
    watchGetHotels(),
    watchGetHeats(),
  ];
}
