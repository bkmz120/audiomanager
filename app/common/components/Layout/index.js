import React, { Component } from 'react';
import Navbar  from 'Common/containers/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class Layout extends Component {
  render() {
    const {
      children,
      navBarEnable
    } = this.props

    let navBar;
    if (navBarEnable!==false) {
      navBar = <Navbar />;
    }

    return (
      <CssBaseline>
        {navBar}
        <div className="pageContainer">
          {children}
        </div>
      </CssBaseline>
    )
  }
}

