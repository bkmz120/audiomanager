import React, { Component } from 'react'
import { Navbar } from '../../components/Navbar'
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MainWrapper extends Component {
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

