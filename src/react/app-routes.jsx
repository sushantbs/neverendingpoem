import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import Master from './master.jsx';

import Home from './pages/home.jsx';
import SearchPage from './pages/search.jsx';

var AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRedirect to="/home" />
    <Route path="home" component={Home} />
    <Route path="search" component={SearchPage} />
  </Route>
)

export default AppRoutes;
