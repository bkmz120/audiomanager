'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';

import * as reducers from './reducers';
const reducer = combineReducers({
  ...reducers
})

import PrivateRoute from './containers/PrivateRoute';
import AudioManager from './containers/AudioManager';
import {AudioEdit} from './containers/AudioEdit';
import PlaylistManager from './containers/PlaylistManager';
import PlaylistEdit from './containers/PlaylistEdit';
import BackgroundManager from './containers/BackgroundManager';
import {BackgroundEdit} from './containers/BackgroundEdit';
import HistoryManager from './containers/HistoryManager';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import './styles/common.css';


if (localStorage.getItem('isAuthenticated')===null) {
  localStorage.setItem('isAuthenticated',false);
}

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunk)
)

const history = createHashHistory();


const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact name='loginPage' path='/login' component={LoginPage} />
        <Route exact name='logoutPage' path='/logout' component={LogoutPage} />
        <PrivateRoute exact name='audioManager' path='/' component={AudioManager} />
        <PrivateRoute exact name='audioManager' path='/audio' component={AudioManager} />
        <PrivateRoute exact name='audioNew' path='/audio/new' component={AudioEdit} />
        <PrivateRoute exact name='audioEdit' path='/audio/edit/:id' component={AudioEdit} />
        <PrivateRoute exact name='playlistManager' path='/playlist' component={PlaylistManager} />
        <PrivateRoute exact name='playlistNew' path='/playlist/new' component={PlaylistEdit} />
        <PrivateRoute exact name='playlistEdit' path='/playlist/edit/:id' component={PlaylistEdit} />
        <PrivateRoute exact name='backgroundManager' path='/background' component={BackgroundManager} />
        <PrivateRoute exact name='backgroundNew' path='/background/new' component={BackgroundEdit} />
        <PrivateRoute exact name='backgroundEdit' path='/background/edit/:id' component={BackgroundEdit} />
        <PrivateRoute exact name='historyManager' path='/history' component={HistoryManager} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<App/>, document.getElementById('root'))