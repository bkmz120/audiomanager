import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Link, Redirect,withRouter } from 'react-router-dom';
import { createHashHistory } from 'history';

import {store} from "Store"
import PrivateRoute from 'Common/containers/PrivateRoute';
import RouterListener from 'Common/containers/RouterListener';
import AudioManager from 'Pages/audio/containers/AudioManager';
import AudioEdit from 'Pages/audio/components/AudioEdit';
import PlaylistManager from 'Pages/playlist/containers/PlaylistManager';
import PlaylistEdit from 'Pages/playlist/components/PlaylistEdit';
import BackgroundManager from 'Pages/background/containers/BackgroundManager';
import BackgroundEdit from 'Pages/background/components/BackgroundEdit';
import HistoryManager from 'Pages/history/containers/HistoryManager';
import LoginPage from 'Pages/auth/containers/LoginPage';
import LogoutPage from 'Pages/auth/containers/LogoutPage';
import './style.scss';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.history = createHashHistory();
    if (localStorage.getItem('isAuthenticated')===null) {
      localStorage.setItem('isAuthenticated',false);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={this.history}>
          <RouterListener>
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
          </RouterListener>
        </Router>
      </Provider>
    )
  }
}