import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import MapPage from './containers/MapPage';
import CounterPage from './containers/CounterPage';
import TodoPage from './containers/TodoPage';

/**
 * Define routes
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="map" />
    <Route path="map" component={MapPage} />
    <Route path="counter" component={CounterPage} />
    <Route path="todo" component={TodoPage} />
  </Route>
);

export default routes;
