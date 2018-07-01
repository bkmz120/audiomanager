import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";

import {changeTab} from '../../actions/navbar.js';

export class Nav extends React.Component {


  handleChange = (event, value) => {
    this.props.changeTab(value);
  };

  render() {
    const value = this.props.selectedTab;
    return (
      <AppBar position="static">
        <Tabs value={value} onChange={this.handleChange} >
          <Tab component={Link} to="/audio"  label="Audio Manager" />
          <Tab component={Link} to="/playlist" label="Playlist Manager" />
          <Tab label="Background Manager"/>
        </Tabs>
      </AppBar>
    )
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

export const Navbar = connect(mapStateToProps,mapDispatchToProps)(Nav);
