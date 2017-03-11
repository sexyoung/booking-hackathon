import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import CounterPage from './containers/CounterPage';
import TodoPage from './containers/TodoPage';

/**
 * Define routes
 */
const routes = (
  <Route path="/" component={App}>
    <Route path="counter" component={CounterPage} />
    <Route path="todo" component={TodoPage} />
  </Route>
);

export default routes;
