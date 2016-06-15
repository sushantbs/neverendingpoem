import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, Route} from 'react-router';
import domready from 'domready';
import AppRoutes from './app-routes.jsx';

domready(() => {

  ReactDOM.render((
    <Router history={browserHistory}>
      {AppRoutes}
    </Router>
  ), document.getElementById('app-container'));
});
