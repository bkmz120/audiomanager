import React from 'react';
import ReactDragList from 'react-drag-list'


import {TrackItem} from '../TrackItem';
import "./style.css";

export const TrackList = (props) => {
  let processOverlay;
  if (props.getTracksProcess) {
    processOverlay = <div className="trackList__processOverlay"></div>;
  }

  return (
    <div className="trackList">
      <ReactDragList
        dataSource={props.tracks}
        disabled={!props.draggable}
        row={(track, index) => <TrackItem key={track.id} track={track} deleteCallback={props.deleteCallback} btns={props.btns}></TrackItem>}
      />
      {processOverlay}
    </div>
  );
}