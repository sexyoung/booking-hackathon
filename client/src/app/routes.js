import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import MapPage from 'containers/MapPage';
import TestPage from 'containers/TestPage';

/**
 * Define routes
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MapPage} />
    <Route path="edit" component={MapPage} />
    <Route path="test" component={TestPage} />
  </Route>
);

export default routes;
