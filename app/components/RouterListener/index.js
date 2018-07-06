import React, { Component } from 'react'
import {connect} from "react-redux";
import {withRouter } from 'react-router-dom';

import {changeTab} from '../../actions/navbar.js';

class RouterListener extends Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      let selectedTab = 0;

      switch (location.pathname) {
        case "":
          selectedTab = 0;
          break;
        case "/audio":
          selectedTab = 0;
          break;
        case "/playlist":
          selectedTab = 1;
          break;
        case "/background":
          selectedTab = 2;
          break;
        case "/history":
          selectedTab = 3;
          break;
      }

      this.props.changeTab(selectedTab);
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedTab : state.navbar.selectedTab
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeTab : (tabIndex) => dispatch(changeTab(tabIndex)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RouterListener));