import React, { Component } from 'react';
import {connect} from "react-redux";
import {Redirect } from 'react-router-dom';

import {logout} from 'Actions/user';


class LogoutPage extends Component {

  handleChange = (name) => event => {
    this.props.changeLoginForm(name,event.target.value)
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.logout();
    }
  }

  render() {


    if (this.props.isAuthenticated) return null;
    else return <Redirect to="/login" />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated : state.user.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => dispatch(logout()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogoutPage);