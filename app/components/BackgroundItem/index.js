import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.css";

export const BackgroundItem = (props) => {
  let {background} = props;

  return (
    <div className="backgroundItem">
      <div className="backgroundItem__name">{background.title}</div>

      <Link to={"/background/edit/" + background.id} className="backgroundItem__edit">
        <Icon>edit</Icon>
      </Link>

      <span onClick={() => {props.deleteBackground(background.id)}} className="backgroundItem__delete">
        <Icon>delete</Icon>
      </span>

    </div>
  )
}