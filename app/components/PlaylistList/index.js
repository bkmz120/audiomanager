import React from 'react';

import {PlaylistItem} from '../PlaylistItem';
import "./style.css";

export const PlaylistList = (props) => {
  let processOverlay;
  if (props.getTracksProcess) {
    processOverlay = <div className="playlistList__processOverlay"></div>;
  }

  return (
    <div className="playlistList">
      {props.playlists.map((playlist, i) => { return <PlaylistItem key={playlist.id} playlist={playlist} deletePlaylist={props.deletePlaylist} ></PlaylistItem> })}
      {processOverlay}
    </div>
  );
}