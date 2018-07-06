import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

class PrivateRoute extends Component {

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;

    const renderRoute = (props) => {
      if (isAuthenticated) {
        return <Component {...props} />
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }

    return (
      <Route {...rest} render={renderRoute} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated : state.user.isAuthenticated,
  };
}


export default connect(mapStateToProps)(PrivateRoute);