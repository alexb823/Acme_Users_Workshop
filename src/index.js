import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import App from './App';

const root = document.querySelector('#root');
ReactDOM.render(
  <HashRouter>
    <Route path="/:idx?" component={App} />
  </HashRouter>,
  root
);
