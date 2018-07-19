import React, { Component } from 'react';

import BackgroundItem from 'Pages/background/components/BackgroundItem';
import "./style.scss";

export default class BackgroundList extends Component {
  render() {
    let processOverlay;
    if (this.props.getBackgroundsProcess) {
      processOverlay = <div className="backgroundList__processOverlay"></div>;
    }
    return (
      <div className="backgroundList">
        {this.props.backgrounds.map((background, i) => { return <BackgroundItem key={background.id} background={background} deleteBackground={this.props.deleteBackground} ></BackgroundItem> })}
        {processOverlay}
      </div>
    );
  }
}