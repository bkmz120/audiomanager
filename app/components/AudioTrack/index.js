import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

import "./style.css";

export const AudioTrack = (props) => {
  let {track} = props;

  return (
    <div className="audioTrack">
      <div className="audioTrack__name">{track.title}</div>
      <Button variant="fab" color="primary" aria-label="edit" className="audioTrack__edit">
        <Icon>edit</Icon>
      </Button>
      <Button variant="fab" color="secondary" aria-label="edit" className="audioTrack__delete">
        <Icon>delete</Icon>
      </Button>
    </div>
  )
}