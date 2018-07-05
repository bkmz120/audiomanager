import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.css";

export const PlaylistItem = (props) => {
  let {playlist} = props;

  let setCurrentBtn;
  if (!playlist.current) {
    setCurrentBtn = (
      <span
        onClick={ () => { props.setCurrent(playlist.id) }}
        className={"playListItem__setCurrent " + (playlist.current ? 'playListItem__setCurrent_current' : '')}
      >
        {playlist.current ? 'current' : 'Set as current'}
      </span>
    )
  }
  else {
    setCurrentBtn = (
      <span className="playListItem__current">
        <Icon>done</Icon>
        <span className="playListItem__current-text">Current</span>
      </span>
    )
  }

  return (
    <div className="playListItem">
      <div className="playListItem__name">{playlist.title}</div>

      <div className="playListItem__btns">
        <Link to={"/playlist/edit/" + playlist.id} className="playListItem__edit">
          <Icon>edit</Icon>
        </Link>
        <span onClick={() => {props.deletePlaylist(playlist.id)}} className="playListItem__delete">
          <Icon>delete</Icon>
        </span>
        {setCurrentBtn}
      </div>
    </div>
  )
}