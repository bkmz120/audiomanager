import React from 'react';

import {BackgroundItem} from '../BackgroundItem';
import "./style.css";

export const BackgroundList = (props) => {
  let processOverlay;
  if (props.getBackgroundsProcess) {
    processOverlay = <div className="backgroundList__processOverlay"></div>;
  }
  return (
    <div className="backgroundList">
      {props.backgrounds.map((background, i) => { return <BackgroundItem key={background.id} background={background} deleteBackground={props.deleteBackground} ></BackgroundItem> })}
      {processOverlay}
    </div>
  );
}