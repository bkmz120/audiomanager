import React from 'react';

import {AudioTrack} from '../AudioTrack';

export const AudioList = (props) => {
  console.log(props.tracks);
  return (
    <div className="AudioList">
      {props.tracks.map((track, i) => { return <AudioTrack key={track.id} track={track} ></AudioTrack> })}
    </div>
  );
}