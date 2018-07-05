import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';

import "./style.css";

export const TrackItem = (props) => {
  let {track} = props;

  let editBtn;
  if (props.btns.edit) {
    editBtn = (
      <Link to={"/audio/edit/" + track.id} className="trackItem__edit">
        <Icon>edit</Icon>
      </Link>
    );
  }

  let deleteBtn;
  if (props.btns.delete) {
    deleteBtn = (
      <span onClick={() => {props.deleteCallback(track.id, track.idInPlaylist)}} className="trackItem__delete">
        <Icon>delete</Icon>
      </span>
    );
  }


  let addToPlaylistBtn;
  if (props.btns.addToPlaylist) {
    let addToPlaylistBlock = false;
    if (props.addToPlaylistBlock===true) {
      addToPlaylistBlock = true;
    }
    addToPlaylistBtn = (
      <span
        onClick={() => {
          if (!addToPlaylistBlock) props.addToPlaylistCallback(track)
        }}
        className={"trackItem__addToPlaylist " + (addToPlaylistBlock ? 'trackItem__addToPlaylist_disabled':'')}
      >
        <Icon>add</Icon>
      </span>
    );
  }

  return (
    <div className="trackItem">
      <div className="trackItem__firstBtns">
        {addToPlaylistBtn}
      </div>
      <div className="trackItem__name">{track.title}</div>
      <div className="trackItem__endBtns">
        {editBtn}
        {deleteBtn}
      </div>
    </div>
  )
}