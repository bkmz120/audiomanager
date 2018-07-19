import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import {Redirect } from 'react-router-dom';


import Layout from 'Common/components/Layout';
import {login, logout, changeLoginForm, initForm} from 'Actions/user';

import "./style.scss";

class LoginPage extends Component {

  componentWillUnmount() {
    this.props.initForm();
  }

  handleChange = (name) => event => {
    this.props.changeLoginForm(name,event.target.value)
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />
    }


    return (
      <Layout navBarEnable={false}>
        <form className="loginForm">
          <div className="loginForm__field">
            <TextField
              error={(!this.props.loginFormValid && !this.props.loginFormValidProps.username ? true : undefined)}
              id="username"
              label="Username"
              required
              margin="normal"
              value={this.props.loginForm.username}
              onChange={this.handleChange('username')}
            />
          </div>
          <div className="loginForm__field">
            <TextField
              error={(!this.props.loginFormValid && !this.props.loginFormValidProps.password ? true : undefined)}
              id="password"
              label="Password"
              required
              margin="normal"
              type="password"
              value={this.props.loginForm.password}
              onChange={this.handleChange('password')}
            />
          </div>
          <div className="loginForm__field">
            <Button
              variant="contained"
              color="primary"
              className="loginForm__loginBtn"
              onClick={() => {this.props.login(this.props.loginForm.username,this.props.loginForm.password) } }
            >
              Login
            </Button>
          </div>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginForm : state.user.loginForm,
    loginFormValid : state.user.loginFormValid,
    loginFormValidProps : state.user.loginFormValidProps,
    redirectToReferrer : state.user.redirectToReferrer,
    isAuthenticated : state.user.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginForm: (key,value) => dispatch(changeLoginForm(key,value)),
    login : (username,password) => dispatch(login(username,password)),
    logout : () => dispatch(logout()),
    initForm : () => dispatch(initForm()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);