import React, { Component } from 'react'
import { Navbar } from '../../components/Navbar'
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MainWrapper extends Component {
  render() {
    const {
      children
    } = this.props

    return (
      <CssBaseline>
        <Navbar />
        <div className="pageContainer">
          {children}
        </div>
      </CssBaseline>
    )
  }
}

