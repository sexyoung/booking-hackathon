import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

/**
 * Create Redux store
 *
 * @param  {Object} initialState initial state
 *
 * @return {Store}               redux store
 */
export default function configureStore(initialState) {
  let store = null;
  let middleware;
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({ collapsed: true });

    // set middleware for development or production build
  if (process.env.NODE_ENV === 'development') {
    middleware = [thunk, reduxImmutableStateInvariant(), logger, sagaMiddleware];
  } else {
    middleware = [thunk, sagaMiddleware];
  }

    // create store
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
