import React from 'react';

import {AudioTrack} from '../AudioTrack';
import "./style.css";

export const AudioList = (props) => {
  let processOverlay;
  if (props.getTracksProcess) {
      processOverlay = <div className="audioList__processOverlay"></div>;
  }

  return (
    <div className="audioList">
      {props.tracks.map((track, i) => { return <AudioTrack key={track.id} track={track} ></AudioTrack> })}
      {processOverlay}
    </div>
  );
}