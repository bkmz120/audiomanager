import React, {Component} from 'react';
import ReactDragList from 'react-drag-list';
import DraggableList from 'react-draggable-list';



import {TrackItem} from '../TrackItem';
import "./style.css";

// export const TrackList = (props) => {


//   let tracks = props.tracks;

//   let onOrderChange = (event) => {
//     console.log(tracks);
//   }

//   return (

//   );
// }

export class TrackList extends Component {

  constructor(props) {
    super(props);
  }

  onOrderChange = (event) => {
    this.props.orderChangeCallback(event.oldIndex,event.newIndex);
  }

  render() {


    let processOverlay;
    if (this.props.getTracksProcess) {
      processOverlay = <div className="trackList__processOverlay"></div>;
    }

    return (
      <div className="trackList">
        <ReactDragList
          dataSource={this.props.tracks}
          disabled={!this.props.draggable}
          row={(track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              addToPlaylistBlock={this.props.addToPlaylistBlock}
              addToPlaylistCallback={this.props.addToPlaylistCallback}
              deleteCallback={this.props.deleteCallback}
              btns={this.props.btns}
            />
          )}
          onUpdate={this.onOrderChange}
        />

      </div>
    );
  }
}