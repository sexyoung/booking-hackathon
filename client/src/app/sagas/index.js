import {
  watchGetAttractions,
} from './attraction';

export default function* rootSaga() {
  yield [
    watchGetAttractions(),
  ];
}
