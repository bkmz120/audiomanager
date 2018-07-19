import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.scss";

export default class BackgroundItem extends Component {
  render() {
    let {background} = this.props;

    return (
      <div className="backgroundItem">
        <div className="backgroundItem__name">{background.title}</div>

        <Link to={"/background/edit/" + background.id} className="backgroundItem__edit">
          <Icon>edit</Icon>
        </Link>

        <span onClick={() => {this.props.deleteBackground(background.id)}} className="backgroundItem__delete">
          <Icon>delete</Icon>
        </span>

      </div>
    )
  }
}