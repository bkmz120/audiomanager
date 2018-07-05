import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.css";

export const PlaylistItem = (props) => {
  let {playlist} = props;

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

        <span onClick={() => {props.setCuurentPlaylist(playlist.id)}} className="playListItem__setCurrent">
          Set current
        </span>
      </div>
    </div>
  )
}