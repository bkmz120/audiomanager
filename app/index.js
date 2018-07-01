'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { createHashHistory } from 'history';

import * as reducers from './reducers';
const reducer = combineReducers({
  ...reducers
})

import AudioManager from './containers/AudioManager';
import {AudioEdit} from './containers/AudioEdit';
import {PlaylistManager} from './containers/PlaylistManager';
import './styles/common.css';

const store = createStore(
  reducer
)

const history = createHashHistory()

history.listen((location, action) => {

})

const Todo = () => (
  <div>
    <p>textx</p>
    <Link to="/settings">Settings</Link>
  </div>
);

const Todo2 = () => (
  <div>
    <p>textx2</p>
    <Link to="/">Home</Link>
  </div>
);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact name='audioManager' path='/' component={AudioManager} />
        <Route exact name='audioManager' path='/audio' component={AudioManager} />
        <Route exact name='audioEdit' path='/audio/new' component={AudioEdit} />
        <Route exact name='playlistManager' path='/playlist' component={PlaylistManager} />
      </Switch>
    </Router>
  </Provider>
)


ReactDOM.render(<App/>, document.getElementById('root'))