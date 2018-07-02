import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.css";

export const AudioTrack = (props) => {
  let {track} = props;

  return (
    <div className="audioTrack">
      <div className="audioTrack__name">{track.title}</div>

      <Link to={"/audio/edit/" + track.id} className="audioTrack__edit">
        <Icon>edit</Icon>
      </Link>

      <span onClick={() => {props.deleteTrack(track.id)}} className="audioTrack__delete">
        <Icon>delete</Icon>
      </span>

    </div>
  )
}