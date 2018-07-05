'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { createHashHistory } from 'history';

import * as reducers from './reducers';
const reducer = combineReducers({
  ...reducers
})

import AudioManager from './containers/AudioManager';
import {AudioEdit} from './containers/AudioEdit';
import PlaylistManager from './containers/PlaylistManager';
import PlaylistEdit from './containers/PlaylistEdit';
import BackgroundManager from './containers/BackgroundManager';
import {BackgroundEdit} from './containers/BackgroundEdit';
import './styles/common.css';

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunk)
)

const history = createHashHistory()

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact name='audioManager' path='/' component={AudioManager} />
        <Route exact name='audioManager' path='/audio' component={AudioManager} />
        <Route exact name='audioNew' path='/audio/new' component={AudioEdit} />
        <Route exact name='audioEdit' path='/audio/edit/:id' component={AudioEdit} />
        <Route exact name='playlistManager' path='/playlist' component={PlaylistManager} />
        <Route exact name='playlistNew' path='/playlist/new' component={PlaylistEdit} />
        <Route exact name='playlistEdit' path='/playlist/edit/:id' component={PlaylistEdit} />
        <Route exact name='backgroundManager' path='/background' component={BackgroundManager} />
        <Route exact name='backgroundNew' path='/background/new' component={BackgroundEdit} />
        <Route exact name='backgroundEdit' path='/background/edit/:id' component={BackgroundEdit} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<App/>, document.getElementById('root'))