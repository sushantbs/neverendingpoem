import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import Master from './master.jsx';

import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Rules from './pages/rules.jsx';
import Poem from './pages/poem.jsx';
import Contact from './pages/contact.jsx';

var AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRedirect to="/home" />
    <Route path="home" tab="home" component={Home} />
    <Route path="rules" tab="rules" component={Rules} />
    <Route path="poem" tab="poem" component={Poem} />
    <Route path="about" tab="about" component={About} />
    <Route path="contact" tab="contact" component={Contact} />
  </Route>
)

export default AppRoutes;
